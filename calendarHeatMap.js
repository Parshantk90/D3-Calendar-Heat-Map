async function drawHeatMap(){
       
       var dataset = await d3.json("Data.json");

       // dataset grouping at different levels
   
       var months = d3.groups(dataset, d => d.MONTHID);
       var months_name = d3.groups(dataset, d => d.M_NAME);
       var week = ["Sun","Tue","Thu","Sat"];
       var legends = ["Balance Pending","No Order Recieved","Order Recieved"];
   
       var box = 12; //cell size - ideal is 12 to 25
     
       //Dimensions
       var dim = {
           width:months.length*80+60,
           height:box*7+80,
           margin:{
               top:10,
               bottom:10,
               left:10,
               right:10
           }
       }
   
       dim.ctrWidth = dim.width - dim.margin.left - dim.margin.right;
       dim.ctrHeight = dim.height - dim.margin.top - dim.margin.bottom;
   
       // Accessor Functions:
       var balanceFlagAccessor = (d) => d.BAL_FLAG;
       var dayNameAccessor = (d)=>d.DAY_NAME_SHORT;
       var orderAmountAccessor = (d)=>d.TOTAL_AMOUNT;
       var balanceAmountAccessor = (d)=>(d.TOTAL_AMOUNT-d.DISCOUNT-d.RECIEVED_AMOUNT);
       var dateAccessor = (d) => d.DB_DATE;
       var weekDayNoAccessor = (d)=>d.WEEKDAYNO;
       var weekOfMonthAccessor = (d)=>d.WEEK_OF_MONTH;
   
      // colorScale
       var colorScale = d3.scaleQuantize()
       .domain([-1,1])
       .range(['#c4405e','#dfe1e4','#40c463']);
   
       //Parent SVG
       var svg = d3.select('#orderHeatMap')
       .append('svg')
       .attr('width',dim.width)
       .attr('height',dim.height)
       .classed('svg-area',true);
   
       //container
       var ctr = svg.append('g')
       .attr('transform',`translate(${dim.margin.left},${dim.margin.top})`);
   
   
       //Heat Maps Container
       var heatMapCtr = ctr.append("g")
       .attr('transform',`translate(50,30)`);
   
       // Week Labels
       var weekGroup = ctr.append("g")
           .attr("transform", `translate(0,${dim.margin.top+50})`)
           .selectAll("text")
           .data(week)
           .join("text")
           .style("font-size",`12px`)
           .text((d)=>d)
           .attr("y",(d,i)=>(box*2)*(i%4))
           .attr("x",0);
        
       // loop to render heatmaps
   
       for(j=0;j<months.length;j++){
   
           // Month Labels
           heatMapCtr.append("g")
           .attr("transform", `translate(${j*(box*6+20)},10)`)
           .append("text")
           .attr("x",0)
           .classed("heatMapMonths-labels",true)
           .text(months_name[j][0]);
   
           // Monthly Heatmap
           heatMapCtr.append("g")
           .attr("transform", `translate(${j*(box*6+20)},20)`)
           .selectAll("rect")
           .data(months[j][1])
           .join("rect")
           .attr("width",box)
           .attr("height",box)
           .attr("y",(d,i)=>(box+1)*((weekDayNoAccessor(d))%7))
           .attr("x",(d,i)=>(box+1)*(weekOfMonthAccessor(d)))
           .attr("fill",(d)=>colorScale(balanceFlagAccessor(d)))
           .on("mouseenter",function(e){
             d3.select(this)
             .attr("stroke","black")
             .attr("stroke-width",2);
           })
           .on("mouseleave",function(e){
             d3.select(this)
             .attr("stroke","black")
             .attr("stroke-width",0);
           })
           .append("text")
           .append("title")
           .text((d)=>"Date : "+dateAccessor(d)+", Day : "+dayNameAccessor(d)+", Sale : "+orderAmountAccessor(d)+", Balance : "+balanceAmountAccessor(d))
           
       }
   
       
       // Legends
       var legend = ctr.append("g")
       .attr("transform", `translate(0,10)`);
   
       legend.selectAll("rect")
       .data(legends)
       .join("rect")
       .attr("width",box)
       .attr("height",box)
       .attr("x",(d,i)=>140*(i%3))
       .attr("y",-11)
       .attr("fill",(d,i)=>colorScale(i-1));
       
       legend.selectAll("text")
       .data(legends)
       .join("text")
       .attr("x",(d,i)=>140*(i%3)+box+2)
       .attr("y",0)
       .text((d)=>d)
       .style("font-size","12px");
      
   }

   drawHeatMap();