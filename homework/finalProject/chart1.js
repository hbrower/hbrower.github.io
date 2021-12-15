//Treemap Chart

    // set the dimensions and margins of the graph
    var margin1 = {top: 10, right: 10, bottom: 10, left: 10},
      width1 = parseFloat(d3.select("#chart1").style("width"), 10) - margin1.left - margin1.right,
      height1 = 600 - margin1.top - margin1.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#chart1")
      .attr("width", width1 + margin1.left + margin1.right)
      .attr("height", height1 + margin1.top + margin1.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin1.left + "," + margin1.top + ")");
    
    // Read data
    d3.csv('state_data.csv', function(data) {
    
    var root = d3.stratify()
    .id(function(d) { return d.state; })   
    .parentId(function(d) { return d.parent; })   
    (data);
  root.sum(function(d) { return +d.arrests })   
      d3.treemap()
        .size([width1, height1])
        .padding(4)
        .tile(d3.treemapSquarify)
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
          .attr("fill", function(d) {
            if (d.data.legal =="0") {
                return "#FF5733";
            }
            else if (d.data.legal =="1") {
                return "#DAF7A6";
            }
            else if (d.data.legal =="2") {
              return "#255818";
          }
          })
          

            .on("mousemove", function(d) {

              var tooltip = d3.select("#tooltip")
                .style("display", "block")
                .style("top", d3.event.pageY + 20 + "px")
                .style("left", d3.event.pageX + 20 + "px");
          
              tooltip.select("#title").html(d.data.state);
              tooltip.select("#arrests").html("Arrests: " + d.data.arrests);
              tooltip.select("#population").html("Population: " + d.data.population);

            })
            .on("mouseout", function() {
              d3.select("#tooltip")
                .style("display", "none");
            });
    
      // and to add the text labels
      svg 
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
          .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
          .text(function(d){
             if (d.data.arrests >=600) {
              return d.data.abbr;
          }
            else if (d.data.arrests <=600) {
              return "";
          }
        })
          .attr("font-size", "10px")
          .attr("fill", "black")
    })
