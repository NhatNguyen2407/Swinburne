// Week 6 - D3 data loading, histogram, filters, scatterplot and tooltips.
const chartWidth = 920;
const chartHeight = 410;
const margin = { top: 20, right: 30, bottom: 60, left: 75 };
const innerWidth = chartWidth - margin.left - margin.right;
const innerHeight = chartHeight - margin.top - margin.bottom;
const colours = { LCD: "#b47b42", LED: "#287584", OLED: "#8460a9" };
const state = { tech: "all", size: "all" };
let tvData = [];

// A fixed bin range makes comparisons meaningful when filters change.
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, 2700])
  .thresholds(d3.range(0, 2701, 150));

const xEnergy = d3.scaleLinear().domain([0, 2700]).range([0, innerWidth]);
const xSize = d3.scaleLinear().domain([0, 120]).range([0, innerWidth]);
const yEnergy = d3.scaleLinear().domain([0, 2800]).range([innerHeight, 0]);

function setupPlot(selector, title) {
  const svg = d3.select(selector).append("svg")
    .attr("viewBox", "0 0 " + chartWidth + " " + chartHeight)
    .attr("role", "img");
  svg.append("title").text(title);
  const plot = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  return { svg, plot };
}

function axisLabels(svg, xLabel, yLabel) {
  svg.append("text").attr("class", "axis-label")
    .attr("x", chartWidth / 2).attr("y", chartHeight - 9)
    .attr("text-anchor", "middle").text(xLabel);
  svg.append("text").attr("class", "axis-label")
    .attr("transform", "translate(17," + chartHeight / 2 + ") rotate(-90)")
    .attr("text-anchor", "middle").text(yLabel);
}

const hist = setupPlot("#histogram-chart", "Histogram of annual labelled TV energy consumption");
const scatter = setupPlot("#scatter-chart", "Screen size versus annual energy consumption");

const histY = d3.scaleLinear().range([innerHeight, 0]);
const histXAxis = hist.plot.append("g").attr("transform", "translate(0," + innerHeight + ")")
  .call(d3.axisBottom(xEnergy).ticks(9));
const histYAxis = hist.plot.append("g");
axisLabels(hist.svg, "Labelled energy consumption (kWh/year)", "TV records");

scatter.plot.append("g").attr("transform", "translate(0," + innerHeight + ")")
  .call(d3.axisBottom(xSize).ticks(8));
scatter.plot.append("g").call(d3.axisLeft(yEnergy).ticks(7));
axisLabels(scatter.svg, "Screen size (inches)", "Labelled energy consumption (kWh/year)");
scatter.plot.append("g").attr("class", "grid")
  .call(d3.axisLeft(yEnergy).ticks(7).tickSize(-innerWidth).tickFormat(""));

function filteredData() {
  return tvData.filter(d =>
    (state.tech === "all" || d.screenTech === state.tech) &&
    (state.size === "all" || d.screenSize === +state.size)
  );
}

function drawHistogram(data) {
  const bins = binGenerator(data);
  histY.domain([0, Math.max(1, d3.max(bins, d => d.length))]).nice();
  histYAxis.transition().duration(250).call(d3.axisLeft(histY).ticks(6));
  hist.plot.selectAll(".bar").data(bins, d => d.x0)
    .join("rect")
    .attr("class", "bar")
    .attr("x", d => xEnergy(d.x0) + 1)
    .attr("width", d => Math.max(0, xEnergy(d.x1) - xEnergy(d.x0) - 2))
    .attr("y", innerHeight)
    .attr("height", 0)
    .each(function(d) {
      d3.select(this).selectAll("title").data([d]).join("title")
        .text(d.x0 + "-" + d.x1 + " kWh/year: " + d.length + " records");
    })
    .transition().duration(320)
    .attr("y", d => histY(d.length))
    .attr("height", d => innerHeight - histY(d.length));
  console.log("Exercise 6.1 - histogram bins", bins.map(d => ({ from: d.x0, to: d.x1, count: d.length })));
}

const tooltip = d3.select("#tooltip");
function showTooltip(event, d) {
  tooltip.text(
    d.brand + " / " + d.model +
    "\n" + d.screenTech + " - " + d.screenSize + " inches" +
    "\nEnergy: " + d.energyConsumption + " kWh/year" +
    "\nStar rating: " + d.star
  ).style("display", "block");
  moveTooltip(event);
}
function moveTooltip(event) {
  const bounds = document.querySelector(".scatter-stage").getBoundingClientRect();
  tooltip.style("left", Math.max(8, Math.min(bounds.width - 275, event.clientX - bounds.left + 12)) + "px")
    .style("top", Math.max(8, event.clientY - bounds.top - 75) + "px");
}
function drawScatter(data) {
  scatter.plot.selectAll(".dot").data(data, d => d.model)
    .join("circle")
    .attr("class", "dot")
    .attr("r", 2.8)
    .attr("cx", d => xSize(d.screenSize))
    .attr("cy", d => yEnergy(d.energyConsumption))
    .attr("fill", d => colours[d.screenTech])
    .on("mouseenter", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", () => tooltip.style("display", "none"));
}

function updateCharts() {
  const data = filteredData();
  drawHistogram(data);
  drawScatter(data);
  d3.select("#summary").text(
    data.length.toLocaleString("en-AU") + " of " + tvData.length.toLocaleString("en-AU") +
    " registration records shown" + (state.tech === "all" ? "" : " - " + state.tech) +
    (state.size === "all" ? "" : " - " + state.size + " inches")
  );
}

function populateFilters() {
  d3.select("#tech-filters").selectAll("button")
    .data(["all", "LCD", "LED", "OLED"]).join("button")
    .attr("type", "button").attr("class", "filter")
    .attr("aria-pressed", d => String(d === state.tech))
    .text(d => d === "all" ? "All" : d)
    .on("click", (_, d) => {
      state.tech = d;
      d3.select("#tech-filters").selectAll("button")
        .attr("aria-pressed", item => String(item === state.tech));
      updateCharts();
    });
  d3.select("#size-filter").on("change", function() {
    state.size = this.value;
    updateCharts();
  });
}

// The Week 6 export is a selected subset of the Week 1 source in the same row order.
// Ranges use zero-based inclusive indexes; see the dataset notes in README.
Promise.all([
  d3.csv("../Week01/data/tv_2026_02_15.csv"),
  d3.text("data/selected-rows.txt")
]).then(([raw, selection]) => {
  const positions = new Set();
  selection.trim().split(";").forEach(part => {
    const [first, last = first] = part.split("-").map(Number);
    for (let index = first; index <= last; index++) positions.add(index);
  });
  tvData = raw.filter((_, index) => positions.has(index)).map(d => ({
    brand: d.Brand_Reg.trim(),
    model: d.Model_No.trim(),
    screenSize: Math.round(+d.screensize / 2.54),
    screenTech: d.Screen_Tech === "LCD (LED)" ? "LED" : d.Screen_Tech,
    star: +d.Star2,
    energyConsumption: +d["Labelled energy consumption (kWh/year)"]
  }));
  if (raw.length !== 4724 || tvData.length !== 4233 ||
    tvData.some(d => !Number.isFinite(d.energyConsumption) || !Number.isFinite(d.star))) {
    throw new Error("The television dataset no longer matches the Week 6 export.");
  }
  console.log("Exercise 6 - loaded rows", tvData.length, tvData.slice(0, 3));
  populateFilters();
  updateCharts();
}).catch(error => {
  console.error("Exercise 6 - data loading", error);
  d3.select("#summary").text("Could not load the TV data. Start a local web server in the Labs folder and check the source files.");
});
