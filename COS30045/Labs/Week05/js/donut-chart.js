// The pie layout calculates angles; the arc generator draws the donut.
(() => {
  const target=d3.select("#donut-chart");
  target.append("p").attr("class","loading").text("Loading TV screen size data...");
  d3.csv("data/tv_screen_sizes.csv",d=>({category:d.category,count:+d.count})).then(data=>{
    if(data.length!==3||data.some(d=>!d.category||!Number.isFinite(d.count)||d.count<=0))throw new Error("Invalid size groups");
    console.log("Exercise 5.3",data);
    target.selectAll("*").remove();
    const width=700,height=425,total=d3.sum(data,d=>d.count);
    const svg=target.append("svg").attr("viewBox","0 0 "+width+" "+height)
      .attr("role","img").attr("aria-label","Proportions of small, medium and large TV registration records");
    svg.append("title").text("TV registration records by screen size");
    const plot=svg.append("g").attr("transform","translate(234,213)");
    const colors=d3.scaleOrdinal().domain(data.map(d=>d.category))
      .range(["#96b7b7","#256c78","#b47b42"]);
    const pie=d3.pie().sort(null).value(d=>d.count);
    const arc=d3.arc().innerRadius(97).outerRadius(159).padAngle(.012).cornerRadius(3);
    const slices=plot.selectAll(".slice").data(pie(data)).join("path")
      .attr("class","slice").attr("d",arc).attr("fill",d=>colors(d.data.category))
      .attr("stroke","#fff").attr("stroke-width",2);
    slices.append("title").text(d=>d.data.category+": "+d.data.count+" records ("+d3.format(".1%")(d.data.count/total)+")");
    plot.append("text").attr("text-anchor","middle").attr("y",-8).attr("font-size",32)
      .attr("font-weight",700).attr("fill","#20363e").text(d3.format(",")(total));
    plot.append("text").attr("text-anchor","middle").attr("y",18).attr("font-size",14)
      .attr("fill","#5b6b70").text("TV records");
    const legend=svg.append("g").attr("transform","translate(442,118)");
    const entries=legend.selectAll(".entry").data(data).join("g").attr("class","entry")
      .attr("transform",(d,i)=>"translate(0,"+(i*67)+")");
    entries.append("circle").attr("cx",0).attr("cy",8).attr("r",7).attr("fill",d=>colors(d.category));
    entries.append("text").attr("x",18).attr("y",13).attr("font-size",17)
      .attr("font-weight",700).attr("fill","#20363e").text(d=>d.category);
    entries.append("text").attr("x",18).attr("y",34).attr("font-size",13)
      .attr("fill","#5b6b70").text(d=>d3.format(",")(d.count)+" · "+d3.format(".1%")(d.count/total));
  }).catch(error=>{
    console.error("Exercise 5.3",error);
    target.html('<p class="error" role="alert">Could not load the TV size CSV. Run this page through a local web server.</p>');
  });
})();