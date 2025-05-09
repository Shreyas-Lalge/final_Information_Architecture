
const svg = d3.select("svg");
const margin = { top: 40, right: 20, bottom: 40, left: 60 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["Morning", "Afternoon", "Evening"];
const data = [
    [8, 6, 3, 5, 4, 9, 3],
    [7, 4, 5, 7, 6, 8, 2],
    [6, 2, 4, 3, 2, 6, 1]
];

const cellWidth = width / days.length;
const cellHeight = height / times.length;

const colorScale = d3.scaleSequential()
    .domain([0, 10])
    .interpolator(d3.interpolateBlues);

const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

times.forEach((time, i) => {
    g.append("text")
        .attr("x", -10)
        .attr("y", i * cellHeight + cellHeight / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(time);
});

days.forEach((day, i) => {
    g.append("text")
        .attr("x", i * cellWidth + cellWidth / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .text(day);
});

data.forEach((row, i) => {
    row.forEach((value, j) => {
        g.append("rect")
            .attr("x", j * cellWidth)
            .attr("y", i * cellHeight)
            .attr("width", cellWidth)
            .attr("height", cellHeight)
            .attr("fill", colorScale(value))
            .attr("class", "cell")
            .on("mouseover", function(event) {
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html("Availability: " + value)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition().duration(500).style("opacity", 0);
            });
    });
});
