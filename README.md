# hedyehf98.github.io
This line graph shows the changes in contributions to the consumer price index (CPI) of different goods and services between January 2020 and January 2023 in the UK. 
In order to create this visualisation, I copied the raw data from a csv file I'd created in Excel to a Javascript file called data.js. 
To begin, I established the dimensions of the canvas on which the graph would appear, also declaring a margin size, graph width and height to ensure the graph would 
indeed fit on the canvas.
I then drew the x- and y-axis, informing Javascript what each axis would represent, how many ticks would appear on each axis and which elements from data.js would need
to appear by each tick. Once this had been completed, I added the data to my graph, using d3.line and the map functions to map the second, third, fourth and fifth 
columns in data.js to a line on the graph, each corresponding to the CPI fluctuations of a particular good or service. I could see some of the CPI values in a given
month for two different services would often overlap, so I chose my interactive element to be a means for the viewer to directly read off the CPI in a given month 
for all four goods and services by hovering their mouse in the vicinity of the graph. To achieve this, I defined a "mouseover" function, informing Javascript where on
the webpage the mouse should be in order for the data points to appear. I then defined a second function "mouseout", telling Javascript, if the mouse no longer hovers
over or near to the data on the graph, the data points should disappear. I added a series of transparent rectangles to the graph, defining the height, width, x- and
y-coordinates of these rectangles. I then used the d3.on function to add "mouseover" and "mouseout" to the svg so Javascript would know to implement these functions 
in the event the mouse should hover in or outside the rectangles defined.
