d3.csv("public/FiguresForCoursework.csv");
const table = csv.map(row=>row.split(","))
//establish dimensions of canvas and graph
   const graphWidth = 1300;
   const graphHeight = 800;
   const margin = 80;
   const canvasWidth = graphWidth + 2 * margin;
   const canvasHeight = graphHeight + 2 * margin;
  
   const svg = d3.select("body").append("svg")
  .attr("width", canvasWidth).attr("height", canvasHeight)
//draw axes
  const axesDesc = d3.line()(
      [[margin,margin], 
      [margin, graphHeight + margin], 
      [graphWidth + margin, graphHeight + margin]]
      )
  const axes = svg.append("path")
  .attr("d", axesDesc)
  .attr("fill","transparent")
  .attr("stroke","black");

  const x = i => margin + i * graphWidth / (table.length - 1);
  const maxY = 20
  const minY = -7
  const y = datum => margin + (maxY - datum) / (maxY - minY) * graphHeight
  const tickSize = 20

  //label x-axis
  table.forEach((row, i) => {
      svg.append("line")
          .attr("x1", x(i))
          .attr("y1",graphHeight + margin)
          .attr("x2",x(i))
          .attr("y2",graphHeight + margin + tickSize)
          .attr("stroke","black")
      svg.append("text")
          .text(row[0])
          .attr("text-anchor", "middle")
          .attr("x", x(i))
          .attr("y", graphHeight + margin + tickSize + 10)
          .style("font-size","10px")

        function mouseover(){
         svg.selectAll("circle")
            .data(row.slice(1))
            .enter()
            .append("circle")
            .attr("cx", x(i))
            .attr("cy",y)
            .attr("r",2)
            .attr("fill","black")
        svg.selectAll(".dot-label")
            .data(row.slice(1)).enter()
            .append("text")
            .text(d=>d)
            .attr("x",x(i))
            .attr("y",y)
            .attr("class","dot-label")
            
    }
    //add interactive element
    function mouseout(){
        svg.selectAll("circle")
        .data([])
        .exit()
        .remove()
        svg.selectAll(".dot-label")
        .data([])
        .exit()
        .remove()
    }
    const stripWidth = graphWidth/(table.length - 1)
    svg.append("rect")
        .attr("width",stripWidth)
        .attr("height",graphHeight)
        .attr("x",x(i) - 0.5*stripWidth)
        .attr("y",margin)
        .attr("fill","transparent")
        .on("mouseover",mouseover)
        .on("mouseout",mouseout)
  
  })

  //label y-axis
  d3.range(minY,maxY,1).forEach(yValue => {
      svg.append("line")
      .attr("x1", margin)
      .attr("y1", y(yValue))
      .attr("x2", margin - tickSize)
      .attr("y2", y(yValue))
      .attr("stroke","black")
  svg.append("text")
      .text(yValue)
      .attr("text-anchor","middle")
      .attr("x", margin - tickSize - 10)
      .attr("y", y(yValue))
      .style("font-size","14px")
      
  })
  
  //add food and non-alcoholic beverages to the chart
  const foodAndBeverageDesc = d3.line()(table.map((row, i) => [x(i), y(row[1])]));
  const foodAndBeverageLine = svg
  .append("path")
  .attr("d", foodAndBeverageDesc)
  .attr("fill","transparent")
  .attr("stroke","red")

  //add alcohol and tobacco to the chart
  const alcoholAndTobaccoDesc = d3.line()(table.map((row, i) => [x(i), y(row[2])]));
  const alcoholAndTobacco = svg
  .append("path")
  .attr("d", alcoholAndTobaccoDesc)
  .attr("fill","transparent")
  .attr("stroke","purple")

  //add clothing and footwear to the chart
  const clothingAndFootwearDesc = d3.line()(table.map((row, i) => [x(i), y(row[3])]));
  const clothingAndFootwear = svg
  .append("path")
  .attr("d", clothingAndFootwearDesc)
  .attr("fill","transparent")
  .attr("stroke","orange")

  //add hotels and restaurants to the chart
  const hotelsAndRestaurantsDesc = d3.line()(table.map((row, i) => [x(i), y(row[4])]));
  const hotelsAndRestaurants = svg
  .append("path")
  .attr("d", hotelsAndRestaurantsDesc)
  .attr("fill","transparent")
  .attr("stroke","green")
  
  //add label to x-axis
  svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", graphWidth -550)
  .style("font-size","19px")
  .attr("y", graphHeight + 140)
  .text("Date (mm/yyyy)");

  //add label to y-axis
  svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .style("font-size","19px")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (graphHeight/ 3))
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Percentage change in contributions to CPI (%)");

  //add title to graph
  const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  g.append("text")
      .attr("x", graphWidth - 1200)
      .attr("y", graphHeight -760)
      .style("font-size", "19px")
      .attr("text-decoration", "underline")
      .attr("stroke","blue")
      .attr("font-family", "verdana")
      .text("Changes in percentage contributions to consumer price index (CPI) of different goods and services from January 2020 to January 2023");
  
  //add legend to graph (colour-coded key)
  var keys = ["Food and non-alcoholic beverages", "Alcoholic beverages and tobacco", "Clothing and footwear", "Restaurants and hotels"]
  var color = d3.scaleOrdinal()
      .domain(keys)
      .range(["red","purple","orange","green"])
  var size = 20
  svg.selectAll("mydots")
      .data(keys)
      .enter()
      .append("rect")
      .attr("x", 100)
      .attr("y", function(d,i){ return 100 + i*(size+5)})
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})
  svg.selectAll("myLabels")
      .data(keys)
      .enter()
      .append("text")
      .attr("x", 100 + size*1.2)
      .attr("y", function(d,i){ return 100 + i*(size+5) + (size/2)}) 
      .style("fill", function(d){ return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

  

     