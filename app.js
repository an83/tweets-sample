var tweets = [
  '441029196622872576',
  '438518600740405248',
  '435993116659564544',
  '435894915348709376'
]

var svg = d3.select("svg");

var line = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("linear")
    // .tension(0);


var points = [{x: 100, y: 100}, {x: 200, y: 200}, {x: 400, y: 0}, {x: 600, y: 200}];
points = tweets.map(function (item, index) {
  return {x: index * 200 + 200, y: index % 2 * 180 + 100}  
})


var colors = ["#00bfd6", "#0074c8", "#b4be34", "#ef3741"];

var x0, y0; 
var lines = svg.append("g").attr("class", "lines"),
    circles = svg.append("g").attr("class", "circles");


$.each(points, function (index, item) {
  if(typeof x0 !== 'undefined' && typeof y0 !== 'undefined' ){    
      lines.append("svg:line").
      attr("x1", x0).
      attr("y1", y0).
      attr("x2", item.x).
      attr("y2", item.y)
      .attr("stroke-width", 1)
      .attr('stroke', "#d1d1d1");  
  }
  
  circles.append("circle")
    .attr('cx', item.x)
    .attr('cy', item.y)
    .attr('r', 20)
    .attr('fill', colors[index]);

    circles.append('tspan')
    .attr("x", 0)
    .attr("y", 0)
    .html(function (argument) {
      return '<div class="tweet-container container-0"><div class="tweet-date">March 5, 2014</div><blockquote class="twitter-tweet"><p>Canterbury Software Cluster March Event is tonight! Held at EPIC, 78-106 Manchester Street. Starts at 5:30pm. <a href="http://t.co/bB3yfaZq39">http://t.co/bB3yfaZq39</a></p></blockquote> <p></p></div>';
    })

    x0 = item.x;
    y0 = item.y;
});




$.each(tweets, function(index, item) {
  $.ajax({
    url: 'https://api.twitter.com/1/statuses/oembed.json?id=' + item,
    dataType: 'jsonp',
    success: function(data) {

        // remove script 
        var content = data.html.replace('<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>', '</p>');

        // extract date
        var date = content.match(/\w+\s\d+,\s\d+/g);

        // extract status message 
        var status = content.replace(/<\/p>[\.\s\d\w\=\"\:\/\>\<\—\(\)&,;@]+<\/a>/g, '</p>');

        // render(data, index);
        var tweets = $('#tweets');        
        var $container = $('<div>', {"class":"tweet-container container-"+ index})        
          .append($('<div>', {"class":"tweet-date", "html": date}))
          .append(status);

        tweets.append($container);
    }
  });  
});

function render(data, index){  

  svg.append('circle')
    // .attr("cx", 30)
    // .attr("cy", 30)
    .attr("r", 20)
    .style("fill", "red");
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 15;

context.beginPath();
context.moveTo(165, 30);

context.lineTo(165, 600);
context.stroke();

// var y0 = 30;

// context.beginPath();
// context.arc(165, y0, radius, 0, 2 * Math.PI);
// context.fillStyle = '#00bfd6';
// context.fill();

// var y = y0 + 220 * 1;

// context.beginPath();
// context.arc(165, y, radius, 0, 2 * Math.PI);
// context.fillStyle = '#0074c8';
// context.fill();

// y = y0 + 220 * 2;

// context.beginPath();
// context.arc(165, y, radius, 0, 2 * Math.PI);
// context.fillStyle = '#b4be34';
// context.fill();

// y = y0 + 220 * 3;

// context.beginPath();
// context.arc(165, y, radius, 0, 2 * Math.PI);
// context.fillStyle = '#ef3741';
// context.fill();