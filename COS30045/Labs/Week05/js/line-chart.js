// Exercise 5.2 plots both the recorded points and the line joining them.
(() => {
  const target = d3.select("#line-chart");
  target.append("p").attr("class","loading").text("Loading Australian spot price data...");
  const meanColumn = "Average Price (notTas-Snowy)";
  d3.csv("data/ARE_Spot_Prices.csv", d => ({
    year: +d.Year,
    price: +d[meanColumn]
  })).then(data => {
    data = data.filter(d=>Number.isInteger(d.year) && Number.isFinite(d.price))
      .sort((a,b)=>d3.ascending(a.year,b.year));
    if (data.length !== 27 || d3.extent(data,d=>d.year).join("-")!=="1998-2024") {
      throw new Error("Unexpected year range or missing annual values");
    }
    console.log("Exercise 5.2",data);
    target.selectAll("*").remove();
    const width = 700, height = 425, margin={top:39,right:31,bottom:80,left:83};
    const innerWidth=width-margin.left-margin.right,innerHeight=height-margin.top-margin.bottom;
    const svg=target.append("svg").attr("viewBox","0 0 "+width+" "+height)
      .attr("role","img").attr("aria-label","Australian annual average wholesale electricity spot prices from 1998 to 2024");
    svg.append("title").text("Annual wholesale electricity spot prices, 1998–2024");
    const plot=svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");
    const x=d3.scaleLinear().domain(d3.extent(data,d=>d.year)).range([0,innerWidth]);
    const y=d3.scaleLinear().domain([0,d3.max(data,d=>d.price)*1.18]).nice().range([innerHeight,0]);
    const years=[1998,2002,2006,2010,2014,2018,2022,2024];

    plot.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d=>"$"+d).tickSize(-innerWidth))
      .call(g=>g.select(".domain").remove())
      .call(g=>g.selectAll(".tick line").attr("stroke","#dce5df"))
      .call(g=>g.selectAll(".tick text").attr("fill","#5b6b70").attr("font-size",13));
    plot.append("g").attr("transform","translate(0,"+innerHeight+")")
      .call(d3.axisBottom(x).tickValues(years).tickFormat(d3.format("d")))
      .call(g=>g.select(".domain").attr("stroke","#98aaad"))
      .call(g=>g.selectAll(".tick text").attr("font-size",12).attr("fill","#20363e"));

    const line=d3.line().x(d=>x(d.year)).y(d=>y(d.price)).curve(d3.curveLinear);
    plot.append("path").datum(data).attr("fill","none").attr("stroke","#256c78")
      .attr("stroke-width",3).attr("stroke-linejoin","round").attr("d",line);
    plot.selectAll(".spot").data(data).join("circle").attr("class","spot")
      .attr("cx",d=>x(d.year)).attr("cy",d=>y(d.price))
      .attr("r",4.5).attr("fill","#b47b42").attr("stroke","#fff").attr("stroke-width",1)
      .append("title").text(d=>d.year+": $"+d.price.toFixed(2)+"/MWh");
    const peak=data.reduce((highest,d)=>d.price>highest.price?d:highest,data[0]);
    plot.append("text").attr("x",x(peak.year)-8).attr("y",y(peak.price)-14)
      .attr("text-anchor","end").attr("font-size",13).attr("font-weight",700)
      .attr("fill","#20363e").text(peak.year+" · $"+peak.price.toFixed(2));
    svg.append("text").attr("transform","translate(20,"+(margin.top+innerHeight/2)+") rotate(-90)")
      .attr("font-size",13).attr("text-anchor","middle").attr("fill","#5b6b70")
      .text("Average spot price (AUD/MWh)");
    svg.append("text").attr("x",margin.left+innerWidth/2).attr("y",height-12)
      .attr("font-size",13).attr("text-anchor","middle").attr("fill","#5b6b70").text("Year");
  }).catch(error=>{
    console.error("Exercise 5.2",error);
    target.html('<p class="error" role="alert">Could not load the spot price CSV. Check the file and serve the page locally.</p>');
  });
})();