# D3-Calendar-Heat-Map
This project is a plug and paly kind of solution to get a github style D3.js scrollable Heat map with dynamic width and height.
some of the cool features are-
1.  Renders n number of months in a single row
2.  Main Conainer of Heatmaps is scrollable
3.  Cell size, color, legends, week labels are easy to configure points in code and ready to use.
4.  No License library used except D3.js.

# This Project includes 4 Files-

1. Data.json
2. index.html
3. CalendarHeatMap.js
4. style.css

# Your json data should be in below format-(Data.json File)
Data Format required - 
[
  {
    "DATEID":"20210401",
    "DB_DATE":"2021-04-01",
    "DAY":"1",
    "DAY_NAME_SHORT":"Thu",
    "WEEKDAYNO":"4",
    "WEEKNO":"13",
    "WEEK_OF_MONTH":"0",
    "MONTHID":"202104",
    "M_NAME":"Apr-21",
    "YEARID":"2021",
    "ORDER_ID":"1",
    "TOTAL_AMOUNT":"504",
    "RECIEVED_AMOUNT":"500",
    "DISCOUNT":"4",
    "ORDER_DATE":"01-04-2021",
    "BAL_FLAG":"1"
  }
]

# Configurable points in CalendarHeatMap.js file-
You can set below paramaters to change heatmap look and feel

    // dataset grouping at different levels

    var months = d3.groups(dataset, d => d.MONTHID)
    var months_name = d3.groups(dataset, d => d.M_NAME)
    
    // Week labels format and legends for each KPI
    
    var week = ["Sun","Tue","Thu","Sat"];
    var legends = ["Balance Pending","No Order Recieved","Order Recieved"]

    var box = 12; //cell size - ideal is 12 to 25
    var legends = ["Balance Pending","No Order Recieved","Order Recieved"]
  
    // Accessor Functions can e set to relevent KPIS, except date related data points.
    
    var balanceFlagAccessor = (d) => d.BAL_FLAG;
    var dayNameAccessor = (d)=>d.DAY_NAME_SHORT;
    var orderAmountAccessor = (d)=>d.TOTAL_AMOUNT;
    var balanceAmountAccessor = (d)=>(d.TOTAL_AMOUNT-d.DISCOUNT-d.RECIEVED_AMOUNT);
    var dateAccessor = (d) => d.DB_DATE;
    var weekDayNoAccessor = (d)=>d.WEEKDAYNO;
    var weekOfMonthAccessor = (d)=>d.WEEK_OF_MONTH;
    
    
