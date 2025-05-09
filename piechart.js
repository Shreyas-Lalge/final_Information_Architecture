
const data = [
    { label: "Design A", value: 40, feedback: "Elegant" },
    { label: "Design B", value: 35, feedback: "Expressive" },
    { label: "Design C", value: 25, feedback: "Budget-friendly" }
];

const width = 500, height = 300, margin = 40;
const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(["#66c2a5", "#fc8d62", "#8da0cb"]);

const pie = d3.pie().value(d => d.value);
const data_ready = pie(data);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

const tooltip = d3.select("body").append("div").attr("class", "tooltip");

svg.selectAll("path")
    .data(data_ready)
    .join("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.label))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`${d.data.label}<br>Votes: ${d.data.value}<br>Reason: ${d.data.feedback}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        tooltip.transition().duration(300).style("opacity", 0);
    });
