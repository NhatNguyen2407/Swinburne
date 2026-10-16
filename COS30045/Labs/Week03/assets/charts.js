// Fixed charts for the Week 3 data story. No external chart library is required.
(() => {
  const data = window.tvStoryData;
  if (!data) return;
  const NS = "http://www.w3.org/2000/svg";
  const ink = "#182b38", teal = "#286e76", copper = "#aa5840", grid = "#e3e9e7";
  const add = (parent, tag, attrs, label) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    if (label !== undefined) el.textContent = label;
    parent.appendChild(el);
    return el;
  };
  const line = (svg, x1, y1, x2, y2, stroke = grid, width = 1) => add(svg, "line", {x1, y1, x2, y2, stroke, "stroke-width": width});
  const label = (svg, x, y, value, opts = {}) => add(svg, "text", {x, y, fill: ink, "font-size": 15, "text-anchor": "middle", ...opts}, String(value));
  const xPositions = [115, 213, 311, 409, 507, 605, 703];
  const baseY = 292, topY = 29, chartHeight = baseY - topY;
  const sizes = data.sizes;

  const countSvg = document.getElementById("sizes");
  [0, 250, 500, 750, 1000].forEach(t => {
    const y = baseY - t / 1100 * chartHeight;
    line(countSvg, 75, y, 755, y);
    label(countSvg, 58, y + 5, t, {"text-anchor": "end", fill: "#607077", "font-size": 13});
  });
  sizes.forEach((d, i) => {
    const height = d.count / 1100 * chartHeight;
    add(countSvg, "rect", {x: xPositions[i] - 29, y: baseY - height, width: 58, height, fill: teal});
    label(countSvg, xPositions[i], baseY - height - 10, d.count, {"font-weight": 700});
    label(countSvg, xPositions[i], 322, d.label, {"font-size": 14});
  });
  label(countSvg, 411, 357, "Screen diagonal (inches)", {"font-size": 14, fill: "#607077"});

  const energySvg = document.getElementById("energy");
  [0, 250, 500, 750, 1000, 1250].forEach(t => {
    const y = baseY - t / 1250 * chartHeight;
    line(energySvg, 75, y, 755, y);
    label(energySvg, 58, y + 5, t, {"text-anchor": "end", fill: "#607077", "font-size": 13});
  });
  const points = sizes.map((d,i) => [xPositions[i], baseY - d.median / 1250 * chartHeight]);
  add(energySvg, "polyline", {points: points.map(p => p.join(",")).join(" "), fill: "none", stroke: teal, "stroke-width": 4, "stroke-linejoin": "round"});
  points.forEach(([x,y],i) => {
    add(energySvg, "circle", {cx: x, cy: y, r: 6, fill: teal, stroke: "#fff", "stroke-width": 2});
    label(energySvg, x, y - 13, sizes[i].median, {"font-weight": 700});
    label(energySvg, x, 322, sizes[i].label, {"font-size": 14});
  });
  label(energySvg, 411, 357, "Screen diagonal (inches) · median labelled kWh/year", {"font-size": 14, fill: "#607077"});

  const techSvg = document.getElementById("technology");
  const x0 = 160, width = 525;
  [0,150,300,450,600].forEach(t => {
    const x = x0 + t / 600 * width;
    line(techSvg, x, 37, x, 292);
    label(techSvg, x, 319, t, {"font-size": 13, fill: "#607077"});
  });
  data.technologies.forEach((d,i) => {
    const y = 81 + i * 87;
    label(techSvg, x0 - 20, y + 5, d.label, {"text-anchor": "end", "font-size": 16});
    const barWidth = d.median / 600 * width;
    add(techSvg, "rect", {x: x0, y: y - 21, width: barWidth, height: 41, fill: i === 2 ? copper : (i === 1 ? teal : "#86a8ac")});
    label(techSvg, x0 + barWidth + 12, y + 5, d.median + " · n=" + d.count, {"text-anchor": "start", "font-weight": 700, "font-size": 14});
  });
  label(techSvg, 425, 359, "Median labelled kWh/year · screens 60–69 inches", {"font-size": 14, fill: "#607077"});
})();
