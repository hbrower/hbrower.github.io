//Tooltip
d3.select("#chart1")
  .on("mousemove", function() {

    var tooltip = d3.select("#tooltip")
      .style("display", "block")
      .style("top", d3.event.pageY + 20 + "px")
      .style("left", d3.event.pageX + 20 + "px");

    tooltip.select("#title").html("State");
    tooltip.select("#value").html("# of Arrests");

  })
  .on("mouseout", function() {
    d3.select("#tooltip")
      .style("display", "none");
  });

//Treemap Chart

    // set the dimensions and margins of the graph
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = 1400 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#chart1")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Read data
    d3.csv('state_data.csv', function(data) {
    
    var root = d3.stratify()
    .id(function(d) { return d.state; })   
    .parentId(function(d) { return d.parent; })   
    (data);
  root.sum(function(d) { return +d.arrests })   
      d3.treemap()
        .size([width, height])
        .padding(4)
        (root)
    
    console.log(root.leaves())
      // use this information to add rectangles:

      svg
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
          .attr('x', function (d) { return d.x0; })
          .attr('y', function (d) { return d.y0; })
          .attr('width', function (d) { return d.x1 - d.x0; })
          .attr('height', function (d) { return d.y1 - d.y0; })
          .style("stroke", "black")
          .style("fill", "#69b3a2");
    
      // and to add the text labels
      svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
          .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
          .text(function(d){ return d.data.state})
          .attr("font-size", "10px")
          .attr("fill", "black")
    })