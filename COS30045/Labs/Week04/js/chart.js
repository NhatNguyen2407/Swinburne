// Exercise 4.3-4.7: load CSV, bind data, scale bars and label values.
const container = document.querySelector("#bar-chart");
const status = document.querySelector("#status");
const allButton = document.querySelector("#all-brands");
const tenButton = document.querySelector("#top-ten");

if (typeof d3 === "undefined") {
  status.textContent = "D3 could not load. Check the network connection.";
} else {
  d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand.trim(),
    count: +d.count
  }))
    .then(rows => {
      const data = rows.filter(d => d.brand && Number.isFinite(d.count) && d.count >= 0)
        .sort((a, b) => d3.descending(a.count, b.count) || d3.ascending(a.brand, b.brand));

      if (!data.length) throw new Error("No usable rows in the CSV.");
      console.log("Brand records:", data.length);
      console.log("Min, max, extent:", d3.min(data, d => d.count), d3.max(data, d => d.count), d3.extent(data, d => d.count));

      status.remove();
      const svg = d3.select(container).append("svg")
        .attr("role", "img")
        .attr("aria-label", "Bar chart showing available TV registration counts by brand")
        .attr("preserveAspectRatio", "xMidYMin meet");

      const left = 172, right = 72, top = 39, bottom = 39, width = 860;
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) * 1.12])
        .range([left, width - right]);
      const xTicks = xScale.ticks(5);
      const axis = svg.append("g").attr("class", "axis");
      const bars = svg.append("g").attr("class", "bars");
      const heading = svg.append("text")
        .attr("x", left).attr("y", 19).attr("font-size", 13).attr("fill", "#5c6c70")
        .text("Registration records");

      function draw(limit) {
        const selected = limit ? data.slice(0, limit) : data;
        const rowHeight = 31;
        const height = top + selected.length * rowHeight + bottom;
        const yScale = d3.scaleBand().domain(selected.map(d => d.brand))
          .range([top, height - bottom]).padding(0.19);
        svg.attr("viewBox", "0 0 " + width + " " + height);

        axis.selectAll("line.grid")
          .data(xTicks).join("line")
          .attr("class", "grid")
          .attr("x1", d => xScale(d)).attr("x2", d => xScale(d))
          .attr("y1", top - 5).attr("y2", height - bottom + 3)
          .attr("stroke", "#e1e8e4");

        axis.selectAll("text.tick")
          .data(xTicks).join("text")
          .attr("class", "tick")
          .attr("x", d => xScale(d)).attr("y", height - 13)
          .attr("text-anchor", "middle").attr("font-size", 12)
          .attr("fill", "#5c6c70").text(d => d3.format(",")(d));

        const groups = bars.selectAll("g.brand")
          .data(selected, d => d.brand)
          .join(enter => {
            const group = enter.append("g").attr("class", "brand");
            group.append("rect").attr("class", "bar");
            group.append("text").attr("class", "brand-name");
            group.append("text").attr("class", "bar-value");
            group.append("title");
            return group;
          }, update => update, exit => exit.remove())
          .attr("transform", d => "translate(0," + yScale(d.brand) + ")");

        groups.select("rect")
          .attr("x", left).attr("y", 0)
          .attr("width", d => xScale(d.count) - xScale(0))
          .attr("height", yScale.bandwidth())
          .attr("fill", d => d.brand === "samsung" ? "#b96e56" : "#2e7777");

        groups.select("text.brand-name")
          .text(d => d.brand)
          .attr("x", left - 15).attr("y", yScale.bandwidth() / 2 + 5)
          .attr("text-anchor", "end").attr("font-size", 14)
          .attr("fill", "#20383e");

        groups.select("text.bar-value")
          .text(d => d3.format(",")(d.count))
          .attr("x", d => xScale(d.count) + 9)
          .attr("y", yScale.bandwidth() / 2 + 5)
          .attr("font-size", 13).attr("font-weight", "700")
          .attr("fill", "#20383e");

        groups.select("title").text(d => d.brand + ": " + d3.format(",")(d.count) + " records");
        allButton.classList.toggle("active", !limit);
        allButton.setAttribute("aria-pressed", String(!limit));
        tenButton.classList.toggle("active", !!limit);
        tenButton.setAttribute("aria-pressed", String(!!limit));
      }

      allButton.addEventListener("click", () => draw(null));
      tenButton.addEventListener("click", () => draw(10));
      draw(null);
    })
    .catch(error => {
      console.error("Failed to load chart:", error);
      status.textContent = "Could not read the CSV. Run this folder using a local web server (for example, VS Code Live Server).";
    });
}