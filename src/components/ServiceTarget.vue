<template>
  <div class="service-target">
      <div class="radarChart"></div>  
  </div>
</template>

<script>
export default {
  name: 'ServiceTarget',
  props: {
    obj: {},
    tData: {},
  },
  data() {
    return {
      data: [],
      cfg: {
        w: 250,
        h: 250,
        margin: {top: 80, right: 80, bottom: 80, left: 80},
        labelFactor: 1.25,
        wrapWidth: 60,      //The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35,
        dotRadius: 1,
        opacityCircles: 0.1,
        strokeWidth: 0.7,   //The width of the stroke around each blob
        roundStrokes: false,//If true the area and stroke will follow a round path (cardinal-closed)
        // color: d3.scale.category10(),  //Color function
        color: ['#666','#aaa','#e2565d','#3657c2'],  
        hover: true,
        axisLabels: true,
        tickLabels: false,
        fields: false,
        scalesAndAxes: false,
      },
    }
  },
  watch: {

    obj: function() {
      this.dataGen();
      this.RadarChart(".radarChart", this.data);
    }
    
  },
  methods: {

    dataGen() {
      this.data = [
          // 最小值
          {
            "等待時間":0,
            "作業時間":0,
            "暫停時間":0,
            "綜合指標":0,
            "服務人數":0,
            "滿意度":0,
          },
          // 最大值
          {
            "等待時間":this.tData.waitTMax-this.tData.waitTMin,
            "作業時間":this.tData.workTMax-this.tData.workTMin,
            "暫停時間":this.tData.breakTMax-this.tData.breakTMin,
            "綜合指標":this.tData.avgPoint,
            "服務人數":this.tData.serveP,
            "滿意度":this.tData.sati,
          },
          // 參考值:　目前設 Max/2
          {
            "等待時間":(this.tData.waitTMax-this.tData.waitTMin)/2,
            "作業時間":(this.tData.workTMax-this.tData.workTMin)/2,
            "暫停時間":(this.tData.breakTMax-this.tData.breakTMin)/2,
            "綜合指標":this.tData.avgPoint/2,
            "服務人數":this.tData.serveP/2,
            "滿意度":this.tData.sati/2,
          },
          // 目標對象
          {
            "等待時間":this.tData.waitTMax-this.obj.waitT,
            "作業時間":this.tData.workTMax-this.obj.workT,
            "暫停時間":this.tData.breakTMax-this.obj.breakT,
            "綜合指標":this.obj.avgPoint,
            "服務人數":this.obj.serveP,
            "滿意度":this.obj.sati,
          },
      ]
    },

    RadarChart(id, data) {

          // -------------------- cfg --------------------

          let that = this
        
          // If fields specified, filter and sort data to fields
          if (that.cfg.fields != false){
            // data = window.subsetAndSortData(data, that.cfg.fields);
          } else {
            that.cfg.fields = Object.keys(data[0]); // ['等待時間', '作業時間', '暫停時間', '綜合指標', '服務人數', '滿意度']
          }
        
          // Auto-generate scales and axes from given data extents or use given ones.
          var autos;
          if (that.cfg.scalesAndAxes === false){
            autos = this.autoScalesAxes(data);
          } else {
            autos = that.cfg.scalesAndAxes;
          }
          var scales = that.cfg.fields.map(function(k){ return autos[k].scale; });
          var axes = that.cfg.fields.map(function(k){ return autos[k].axis; });
        
          // Rearrange data to an array of arrays
          data = data.map(function(row){
            var newRow = that.cfg.fields.map(function(key) {
                return {"axis": key, "value": row[key]};
            });
            return newRow;
          });
        
          var total = that.cfg.fields.length,            //The number of different axes
            radius = Math.min(that.cfg.w/2, that.cfg.h/2),    //Radius of the outermost circle
            angleSlice = Math.PI * 2 / total;       //The width in radians of each "slice"
        
          // Update ranges of scales to match radius.
          scales = scales.map(function(i){
            // This is gross - no other way to get ordinal scales to behave correctly.
            if (typeof i.rangePoints !== 'undefined'){
                return i.rangePoints([0, radius]);
            } else {
                return i.range([0, radius]);
            }
          });
        
          // ================== (1) Create the container SVG and g ==================
        
          //Remove whatever chart with the same id/class was present before
          d3.select(id).select("svg").remove();
        
          //Initiate the radar chart SVG
          var svg = d3.select(id).append("svg")
            .attr("width",  that.cfg.w + that.cfg.margin.left + that.cfg.margin.right)
            .attr("height", that.cfg.h + that.cfg.margin.top + that.cfg.margin.bottom)
            // .attr("class", "radar"+id);
        
          //Append a g element
          var g = svg.append("g")
            .attr("transform", "translate(" + (that.cfg.w/2 + that.cfg.margin.left) + "," + (that.cfg.h/2 + that.cfg.margin.top) + ")");
        
          // ================== (2) Draw the axes ==================
        
          //Wrapper for the grid & axes
          var axisGrid = g.append("g").attr("class", "axisWrapper");
        
          //Create the straight lines radiating outward from the center
          var axis = axisGrid.selectAll(".axis")
            .data(that.cfg.fields)
            .enter()
            .append("g")
            .attr("class", "axis");
        
          //Append the axes
          var axisGroup = axis.append("g")
            .attr("transform", function(d, i){ return "rotate(" + (180 / Math.PI * (i * angleSlice) + 270) + ")"; })
            .each(function(d, i){
              var ax = axes[i];
              if (that.cfg.tickLabels !== true){
                ax = ax.tickFormat(function(d){ return ""; });
              }
              ax(d3.select(this));
            })
        
          //Append axis category labels
          if (that.cfg.axisLabels === true){
              axisGroup.append("text")
              .attr("class", "legend")
              .style("font-size", "18px")
              .style("font-weight", "bold")
              .attr("text-anchor", "middle")
              .attr(
              'transform', function(d, i){ return "translate("+ radius * that.cfg.labelFactor +",0)" + "rotate(" + (90-(60*i)) + ")" ; },
              )
              .attr("dy", "0.35em")
              .text(function(d){return d;})
              // .call(wrap, cfg.wrapWidth);              
          }
        
          // ================== (3) Draw the radar chart blobs ==================
        
        
          //The radial line function
          var radarLine = d3.svg.line.radial()
            .interpolate("linear-closed")
            .radius(function(d, i) { return scales[i](d.value); })
            .angle(function(d,i) {  return i*angleSlice; });
        
          if(that.cfg.roundStrokes) {
            radarLine.interpolate("cardinal-closed");
          }
        
          //Create a wrapper for the blobs
          var blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");
        
          //Append the backgrounds
          blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", function(d,i) { return radarLine(d); })
            .style("fill", function(d,i) { if(i==3) {return that.cfg.color[i]} else {return that.cfg.color[0]};  })
            .style("fill-opacity", function(d,i) { if(i==3) {return that.cfg.opacityArea} else {return 0};})
        
          //Create the outlines
          blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", function(d,i) { return radarLine(d); })
            .style("stroke-width", that.cfg.strokeWidth * 2 + "px")
            .style("stroke", function(d,i) {
               if(i==2||i==3) {
                 return that.cfg.color[i];
                 } else return that.cfg.color[0]; 
               })
            .style("fill", "none");
        
          // Append the circles
          blobWrapper.selectAll(".radarCircle")
            .data(function(d,i) { return d; })
            .enter().append("circle")
            .attr("class", "radarCircle")
            .attr("r", that.cfg.dotRadius)
            .attr("cx", function(d,i){ return scales[i](d.value) * Math.cos(angleSlice*i - Math.PI/2); })
            .attr("cy", function(d,i){ return scales[i](d.value) * Math.sin(angleSlice*i - Math.PI/2); })
            .style("fill", function(d,i,j) { if(j==2||j==3){return that.cfg.color[j];} else return that.cfg.color[0]; })
            .style("fill-opacity", 1);
        
          // ================== (4) Append invisible circles for tooltip ==================
        
          if (that.cfg.hover === true){
        
            //Wrapper for the invisible circles on top
            var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
              .data(data)
              .enter().append("g")
              .attr("class", "radarCircleWrapper");
        
            //Append a set of invisible circles on top for the mouseover pop-up
            blobCircleWrapper.selectAll(".radarInvisibleCircle")
              .data(function(d,i) { return d; })
              .enter().append("circle")
              .attr("class", "radarInvisibleCircle")
              .attr("r", that.cfg.dotRadius*5)
              .attr("cx", function(d,i){ return scales[i](d.value) * Math.cos(angleSlice*i - Math.PI/2); })
              .attr("cy", function(d,i){ return scales[i](d.value) * Math.sin(angleSlice*i - Math.PI/2); })
              .style("fill", "none")
              .style("pointer-events", "all")
              .on("mouseover", function(d,i) {
                let newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                let newY =  parseFloat(d3.select(this).attr('cy')) - 10;
        
                tooltip
                  .attr('x', newX)
                  .attr('y', newY)
                  .text(function(x){
                    if(i == 0) {
                      let minDotSec = (that.tData.waitTMax - d.value)/60
                      let min = Math.floor(minDotSec)
                      let sec = Math.floor((minDotSec - min)*60)
                      return min.toString().padStart(2,'0') + ':' + sec.toString().padStart(2,'0')
                    } else if(i == 1) {
                      let minDotSec = (that.tData.workTMax - d.value)/60
                      let min = Math.floor(minDotSec)
                      let sec = Math.floor((minDotSec - min)*60)
                      return min.toString().padStart(2,'0') + ':' + sec.toString().padStart(2,'0')
                    } else if(i == 2) {
                      let minDotSec = (that.tData.breakTMax - d.value)/60
                      let min = Math.floor(minDotSec)
                      let sec = Math.floor((minDotSec - min)*60)
                      return min.toString().padStart(2,'0') + ':' + sec.toString().padStart(2,'0')
                    } else {
                      return d.value;
                    }                    
                  })
                  .transition().duration(200)
                  .style('opacity', 1);
              })
              .on("mouseout", function(){
                tooltip.transition().duration(200)
                  .style("opacity", 0);
              });
        
            //Set up the small tooltip for when you hover over a circle
            var tooltip = g.append("text")
              .attr("class", "tooltip")
              .style("opacity", 0)
              .style("font-size", 28);
          }
        
        },//RadarChart

        autoScalesAxes(data){
        
          var ret = {};
          var fieldNames = Object.keys(data[0]);
        
          fieldNames.map(function(i){
        
            // Get all data for axis
            var axisData = data.map(function(row){
              return row[i];
            });
        
            var scale;
            var axis;
        
            // Autogenerate a scale
            if ((typeof axisData[0] === "string") || (typeof axisData[0] === "boolean")){
        
              // Non-numeric things get an ordinal scale
              var uniqueValues = d3.map(data, function(a){return a[i]; }).keys();
              uniqueValues.unshift("  "); // Padding, so it doesn't start from the center
        
              scale = d3.scale.ordinal()
                .domain(uniqueValues);
        
              axis = d3.svg.axis()
                .scale(scale)
                .tickValues(uniqueValues)
                .orient("bottom");
        
            } else {
        
              // Numeric values get a linear scale
              var extent = d3.extent(data, function(a){return a[i];});
        
              scale = d3.scale.linear()
                .domain(extent);
        
              axis = d3.svg.axis()
                .scale(scale)
                .tickFormat(function(d, i){ if(i != 0){return d + "";} else {return "";}  })
                .orient("bottom");
        
            }
        
            ret[i] = {};
            ret[i].scale = scale;
            ret[i].axis = axis;
        
          });
        
          return ret;
        
        },

  },
}
</script>

<style>

    

    .service-target {
      position: relative;
      padding: 0 30px;
    }

    .radarChart {
      background: #fff;
    }

    body {
        font-family: 'Open Sans', sans-serif;
        /* font-size: 11px; */
        font-weight: 300;
        fill: #242424;
        text-align: center;
        /* text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff; */
        cursor: default;
    }

    .axis path,
    .axis line {
        fill: none;
        stroke: slategray;
        stroke-opacity: 0.6;
        shape-rendering: crispEdges;
    }

</style>
