var tweets = [
  '441029196622872576',
  '438518600740405248',
  '435993116659564544',
  '435894915348709376'
]
var colors = ["#00bfd6", "#0074c8", "#b4be34", "#ef3741"];

var rectwidth = 260,
    circleRadius = 20;

var $tweets = $('#tweets'),
    $svgContainer = $('#svgContainer');

var svg; 
var points;
var vOffset = 10 + rectwidth/2, hOffset = 20 + circleRadius/2;

$.each(tweets, function(index, item) {
  $.ajax({
    url: 'https://api.twitter.com/1/statuses/oembed.json?id=' + item,
    dataType: 'jsonp',
    success: function(data) {
        

        // remove script 
        var content = data.html.replace('<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>', '');

        // extract date
        var date = content.match(/\w+\s\d+,\s\d+/g);

        // extract status message 
        var status = content.match(/<p>[\.\s\d\w\=\"\:\/\>\<\—\(\)&,;@!#-?]+<\/p>/g);

        var authorMatches = content.match(/&mdash;[\s\w]+\(@\w+\)/);

        var author = authorMatches[0].replace(/&mdash;[\s\w]+\(/, '').replace(/\)/, '')

        // render(data, index);
        
        var $container = $('<div>', {
            "class":"tweet-container container-"+ index,
            "data-index": index
          })        
          .append($('<div>', {"class":"tweet-date", "html": date}))
          .append($('<div>', {"class":"twitter-tweet"})
            .append(status)
            .append($('<div>', {"class":"tweet-author", "html": author}))
          );

        $tweets.append($container);

        updateTweetPosition($container);
    }
  });  
});

function updateSVG () {
  var x0, y0;

  if(svg){
    svg.selectAll("g").remove();
  }
  $svgContainer.empty();

  var windowWidth = $(window).width();
  var isLargeWidth = windowWidth >= 912;

  points = tweets.map(function (item, index) {
    if(isLargeWidth){
      return {x: index * 200 + vOffset, y: index % 2 * 180 + hOffset};
    }
    else{
      return {x: vOffset, y: index * 180 + hOffset}; 
    }  
  });

  var svg = d3.select("#svgContainer")
              .append('svg');
              
  var lines = svg.append("g").attr("class", "lines"),
    circles = svg.append("g").attr("class", "circles");

  if(isLargeWidth){
    svg.attr('width', 880).attr('height', 400);
  }
  else{
    svg.attr('width', 280).attr('height', 740);
  }

  $.each(points, function (index, item) {
    if(typeof x0 !== 'undefined' && typeof y0 !== 'undefined' ){    
        lines.append("line").
        attr("x1", x0).
        attr("y1", y0).
        attr("x2", item.x).
        attr("y2", item.y)
        .attr("stroke-width", 1)
        .attr('stroke', "#d1d1d1");  
    }
    
    var node = circles.append("g")
        .attr('data-id', index)
        .attr('transform', 'translate(' + item.x + ',' + item.y + ')');

      node.append('circle')
      .attr('r', circleRadius)
      .attr('fill', colors[index]);

      x0 = item.x;
      y0 = item.y;
  });
}

function updateTweetPosition ($container) {
  var index = $container.data('index');
  var point = points[index];
  $container.css('transform', 'translate(' + (point.x -rectwidth/2) + 'px,' + (point.y + 35) + 'px)');
}

function updatePositions () {
  updateSVG();
  $('.tweet-container').each(function (index, container) {
    updateTweetPosition($(container));
  });
}

$(window).resize(updatePositions);

updateSVG();