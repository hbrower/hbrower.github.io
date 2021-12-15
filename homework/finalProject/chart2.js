
                // create datasets values are in $millions
                var data1 = [
                    {group: "Alaska", value: 24},
                    {group: "California", value: 1032},
                    {group: "Colorado", value: 387},
                    {group: "Illinois", value: 52},
                    {group: "Massachusetts", value: 81},
                    {group: "Nevada", value: 105},
                    {group: "Oregon", value: 133},
                    {group: "Washington", value: 469}
 
                 ];
                 
                 var data2 = [
                    {group: "Arizona", value: 183},
                    {group: "DC", value: 27},
                    {group: "Maine", value: 51},
                    {group: "Michigan", value: 288},
                    {group: "Montana", value: 35},
                    {group: "New Jersey", value: 159},
                    {group: "South Dakota", value: 14},
                    {group: "Vermont", value: 27},
 
                 ];
                 
                 // set the dimensions and margins of the graph
                 var margin2 = {top: 50, right: 50, bottom: 50, left: 50},
                     width2 = parseFloat(d3.select("#chart2").style("width"), 50) - margin2.left - margin2.right,
                     height2 = 600 - margin2.top - margin2.bottom;
                 
                 // append the svg object to the body of the page
                 var svg2 = d3.select("#chart2")
                   .append("svg")
                     .attr("width", width2 + margin2.left + margin2.right)
                     .attr("height", height2 + margin2.top + margin2.bottom)
                   .append("g")
                     .attr("transform",
                           "translate(" + margin2.left + "," + margin2.top + ")");
                 
                 // X axis
                 var x2 = d3.scaleBand()
                   .range([ 0, width2 ])
                   .domain(data1.map(function(d) { return d.group; }))
                   .padding(0.2);
                 svg2.append("g")
                   .attr("transform", "translate(0," + height2 + ")")
                   .call(d3.axisBottom(x2))
                 
                 // Add Y axis
                 var y2 = d3.scaleLinear()
                   .domain([10, 1200])
                   .range([ height2, 0]);
                 svg2.append("g")
                   .attr("class", "myYaxis")
                   .call(d3.axisLeft(y2));
                 
                 // A function that create / update the plot for a given variable:
                 function update(data) {
                 
                   var u = svg2.selectAll("rect")
                     .data(data)
                 
                   u
                     .enter()
                     .append("rect")
                     .merge(u)
                     .transition()
                     .duration(1000)
                       .attr("x", function(d) { return x2(d.group); })
                       .attr("y", function(d) { return y2(d.value); })
                       .attr("width", x2.bandwidth())
                       .attr("height", function(d) { return height2 - y2(d.value); })
                       .attr("fill", "#69b3a2")
                 }
                 
                 // Initialize the plot with the first dataset
                 update(data1)
                 