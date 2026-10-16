// I kept the vertical bar chart separate from the other two exercises.
(() => {
  const target = d3.select("#bar-chart");
  target.append("p").attr("class", "loading").text("Loading television energy data...");
  d3.csv("data/tv_55inch_energy.csv", d => ({
    technology: d.technology,
    records: +d.records,
    average: +d.average_kwh
  })).then(data => {
    data = data.filter(d => d.technology && Number.isFinite(d.records) && Number.isFinite(d.average))
      .sort((a,b) => d3.descending(a.average,b.average));
    if (!data.length) throw new Error("No valid TV energy rows");
    console.log("Exercise 5.1", data);

    d3.select("#bar-total").text(d3.format(",")(d3.sum(data,d=>d.records)) + " records");
    target.selectAll("*").remove();
    const width = 700, height = 425, margin = {top:46,right:30,bottom:82,left:83};
    const innerWidth = width-margin.left-margin.right, innerHeight = height-margin.top-margin.bottom;
    const svg = target.append("svg").attr("viewBox","0 0 "+width+" "+height).attr("role","img")
      .attr("aria-label","Average labelled annual energy by screen technology for 55-inch TVs");
    svg.append("title").text("Annual labelled energy for 55-inch TVs");
    const plot = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");
    const x = d3.scaleBand().domain(data.map(d=>d.technology)).range([0,innerWidth]).padding(.37);
    const y = d3.scaleLinear().domain([0,d3.max(data,d=>d.average)*1.17]).nice().range([innerHeight,0]);

    plot.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
      .call(g=>g.select(".domain").remove())
      .call(g=>g.selectAll(".tick line").attr("stroke","#dce5df"))
      .call(g=>g.selectAll(".tick text").attr("fill","#5b6b70").attr("font-size",13));
    plot.append("g").attr("transform","translate(0,"+innerHeight+")").call(d3.axisBottom(x))
      .call(g=>g.selectAll(".tick text").attr("font-size",14).attr("fill","#20363e"))
      .call(g=>g.select(".domain").attr("stroke","#98aaad"));
    plot.selectAll(".bar").data(data).join("rect").attr("class","bar")
      .attr("x",d=>x(d.technology)).attr("y",d=>y(d.average))
      .attr("width",x.bandwidth()).attr("height",d=>innerHeight-y(d.average))
      .attr("fill",(d,i)=>i===0?"#b47b42":"#256c78")
      .append("title").text(d=>d.technology+": "+d.average.toFixed(1)+" kWh/year ("+d.records+" records)");
    plot.selectAll(".value").data(data).join("text")
      .attr("class","value").attr("x",d=>x(d.technology)+x.bandwidth()/2)
      .attr("y",d=>y(d.average)-10).attr("text-anchor","middle")
      .attr("font-size",14).attr("font-weight",700).attr("fill","#20363e")
      .text(d=>d.average.toFixed(1));
    svg.append("text").attr("transform","translate(21,"+(margin.top+innerHeight/2)+") rotate(-90)")
      .attr("font-size",13).attr("text-anchor","middle").attr("fill","#5b6b70")
      .text("Average labelled energy (kWh/year)");
    svg.append("text").attr("x",margin.left+innerWidth/2).attr("y",height-13)
      .attr("font-size",13).attr("text-anchor","middle").attr("fill","#5b6b70").text("Screen technology");
  }).catch(error => {
    console.error("Exercise 5.1",error);
    target.html('<p class="error" role="alert">Could not load the TV energy CSV. Run this page through a local web server.</p>');
  });
})();