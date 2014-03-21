var tweets = [
  '441029196622872576',
  '438518600740405248',
  '435993116659564544',
  '435894915348709376'
]

var svg = d3.select("svg");

$.each(tweets, function(index, item) {
  $.ajax({
    url: 'https://api.twitter.com/1/statuses/oembed.json?id=' + item,
    dataType: 'jsonp',
    success: function(data) {
        var content = data.html.replace('<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>', '</p>');
        var date = content.match(/\w+\s\d+,\s\d+/g);
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