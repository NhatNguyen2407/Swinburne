// Exercise 4.2: selections, appended HTML, and an SVG rectangle.
if (typeof d3 === "undefined") {
  document.querySelector("#dom-status").textContent = "D3 could not load. Check the network connection.";
} else {
  d3.select("#changing-heading").style("color", "#2e7777");
  d3.select(".message-container")
    .append("p")
    .text("The energy label can help compare different television models.");
  d3.select("#rectangle-demo")
    .append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", 100)
    .attr("height", 30)
    .attr("fill", "#2e7777");
  document.querySelector("#dom-status").textContent = "D3 added the paragraph and rectangle to the DOM.";
}