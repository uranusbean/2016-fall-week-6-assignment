console.log('6.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');

//Import data and parse
d3.csv('../data/olympic_medal_count.csv',parse,function(err,rows){
    console.table(rows);
    var maxCount = d3.max(rows, function(d){return d.count2012;}),
        minCount = d3.min(rows, function(d){return d.count2012;});
    var scaleX = d3.scaleLinear(),
        scaleY = d3.scaleLinear();
    
    scaleY.domain([minCount, maxCount+20])
        .range([h,0]);
    scaleX.domain([0, rows.length])
        .range([0,w]);
        
    // var yAxisLable = [0,10,20,30,40,50,60,70,80,90,100,110,120];
    
    // yAxisLable.forEach(function(yLable){
    //     plot.append('text')
    //         .text(yLable.toString())
    //         .attr('x', 0)
    //         .attr('y',300-scaleY(yLable))
    //         .attr('text-anchor','end');
    // });
    
   
        
    rows.sort(function(a,b){
      return b.count2012 - a.count2012;
    });
    
    rows = rows.slice(0,5);
    console.table(rows);
    
    rows.forEach(function(country, index){
        plot.append('rect')
            .attr("x", m.l+ index * 100)
            .attr("y", scaleY(country.count2012))
            .attr("width", 40)
            .attr("height",h-scaleY(country.count2012) );
        
        plot.append('text')
            .attr('x',index * 100 + m.l + m.r/2)
            .attr('y',h+20)
            .text(country.countryName)
            .attr('text-anchor','middle');
    }) 
    
     var axisY = d3.axisLeft()
        .scale(scaleY)
        .tickSize(-w);
    plot.append('g').attr('class','axis axis-y').call(axisY);
});

function parse(d){
    return {
        countryName: d.Country,
        count2012:(+d['2012'])? (+d['2012']):undefined
  }
}
    //new 
    // var countries = plot.selectAll('.country')
    //     .dataa(rows.slice(0,5))
    //     .enter()
    //     .append('g')
    //     .attr('class','country')
    //     .attr('transform',function(d,i){
    //         return 'translate('+scaleX(i)+',0)';
    //     });
        
    // countries 
    //     .append('rect')
    //     .attr('x',-20)
    //     .aatr('y',function(d){
    //         return scaleY(d.country2012);
    //     })
    //     .attr('width',40)
    //     .attr('height',function(d){
    //         return h - scaleY(d.country2012)
    //     });
    
    // countries
    //     .append('text')
    //     .attr('y', h+20)
    //     .attr('text-anchor','middle')
    //     .text(function(d){return d.country});

    // var axisY = d3.axisLeft()
    //     .scale(scaleY)
    //     .tickSize(-w-200);
        
    // plot.append('g')
    //     .attr('class','axis axis-y')
    //     .attr('transform','translate(-100,0')
    //     .call(axisY);
    
    
