
const data = [
    { label: "Design A", value: 40, feedback: "Elegant and professional" },
    { label: "Design B", value: 35, feedback: "Expressive and colorful" },
    { label: "Design C", value: 25, feedback: "Budget-friendly and easy to manage" }
];

const width = 1000, height = 400, margin = 40;
const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const chartGroup = svg.append("g")
    .attr("transform", `translate(${width / 2 - 100}, ${height / 2})`);

const color = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(["#66c2a5", "#fc8d62", "#8da0cb"]);

const pie = d3.pie().value(d => d.value);
const data_ready = pie(data);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

const tooltip = d3.select("body").append("div").attr("class", "tooltip");

chartGroup.selectAll("path")
    .data(data_ready)
    .join("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.label))
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`<strong>${d.data.label}</strong><br>Votes: ${d.data.value}<br><em>${d.data.feedback}</em>`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        d3.select(this).style("opacity", 0.7);
    })
    .on("mouseout", function() {
        tooltip.transition().duration(300).style("opacity", 0);
        d3.select(this).style("opacity", 1);
    });

// Add labels to slices
chartGroup.selectAll("text")
    .data(data_ready)
    .join("text")
    .text(d => `${d.data.label}: ${d.data.value}`)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("fill", "#000");

// Add legend
const legend = svg.append("g")
    .attr("transform", `translate(${width - 180}, ${margin})`);

data.forEach((d, i) => {
    const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 30})`);

    legendRow.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color(d.label));

    legendRow.append("text")
        .attr("x", 30)
        .attr("y", 15)
        .text(`${d.label} – ${d.feedback}`)
        .style("font-size", "13px");
});
