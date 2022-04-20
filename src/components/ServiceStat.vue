<template>
  <div class="service-stat">
    <div class="rectWrapper">
      <div class="rectChart"></div>
      <ul class="label-list">
        <li v-for="(li, index) in labelList" :key="li.id"><i class="fa-solid fa-square" :style="labelColor[index]"></i> {{li}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceStat',
  props: {
    obj: {},
    tData: {},
  },
  data() {
    return {
      labelList: [
        '等待時間',
        '作業時間',
        '暫停時間',
        '綜合指標',
        '服務人數',
        '滿意度',
      ],
      labelColor: [
        {color:'#1C58C8'},
        {color:'#E67399'},
        {color:'#00D9D1'},
        {color:'#80C400'},
        {color:'#E94024'},
        {color:'#7D4BC5'}
      ],
      dataSet: [],
      width: 350,
      height: 350,
      padding: {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20
      },
      rectStep: 50,
      rectWidth: 45,
      maxValue: 1,
    }
  },
  mounted() {
    this.dataGen();
    this.draw();
  },
  watch: {
    obj: function() {
      this.dataGen();
      this.draw();      
    }    
  },
  computed: {
    graphicHeight() {
      return  this.height - this.padding.top - this.padding.bottom
    }
  },
  methods: {

    dataGen() {
      this.dataSet = [          
          (this.tData.waitTMax-this.obj.waitT)/(this.tData.waitTMax-this.tData.waitTMin),
          (this.tData.workTMax-this.obj.workT)/(this.tData.workTMax-this.tData.workTMin),
          (this.tData.breakTMax-this.obj.breakT)/(this.tData.breakTMax-this.tData.breakTMin),
          (this.obj.avgPoint/this.tData.avgPoint),
          (this.obj.serveP/this.tData.serveP),
          (this.obj.sati/this.tData.sati),
      ]
    },

    fillRect(target){ // 用線性比例尺改寫
        var that = this
        var linear = d3.scale.linear() // 建立一個線性比例尺
            .domain([0,this.maxValue]) // 設定定義域 maxValue
            .range([0,this.graphicHeight]) // 設定值域 graphicHeight
        
        var color = [' #1C58C8',' #E67399',' #00D9D1',' #80C400',' #E94024',' #7D4BC5']
        // var color = [' #4B93C5',' #C54B93',' #56C54B',' #C5BA4B',' #4B56C5',' #7D4BC5']

        target.attr("fill", function(d,i) {
            return color[i]
        })
            .attr("x", function(d,i){
                return that.padding.left + i * that.rectStep
            })
            .attr("y", function(d){
                return that.height - that.padding.bottom - linear(d)
            })
            .attr("width", that.rectWidth)
            .attr("height", function(d){
                return linear(d)
            })
    },

    fillText(target){ // 繪製文字的部份
        var that = this
        target.attr("fill","black")
        .attr("font-size","1rem")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")
        .attr("x", function(d,i){
            return that.padding.left + i * that.rectStep
        })
        .attr("y", function(d){
            return that.height - 2*that.padding.bottom - that.graphicHeight * (d / that.maxValue)
        })
        .attr("dx", that.rectWidth/2)
        .attr("dy", "1rem")
        .text(function(d,i){

            function time(t) {
                let minDotSec = t/60
                let min = Math.floor(minDotSec)
                let sec = Math.floor((minDotSec - min)*60)
                return min.toString().padStart(2,'0') + ':' + sec.toString().padStart(2,'0')
            }
            if(i==0) { return time(that.obj.waitT) }
            else if(i==1) { return time(that.obj.workT) }
            else if(i==2) { return time(that.obj.breakT) }
            else if(i==3) { return that.obj.avgPoint }
            else if(i==4) { return that.obj.serveP }
            else if(i==5) { return that.obj.sati }
        })
    },

    draw(){ // 呼叫以下的function 
    
        if(document.querySelector("svg")) {
          document.querySelector("svg").parentElement.removeChild(document.querySelector("svg"))
        }

        var svg = d3.select(".rectChart")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)

        var updateRect = svg.selectAll("rect").data(this.dataSet) // -- 繪製長條圖 --
        var enterRect = updateRect.enter()
        var exitRect = updateRect.exit()

        this.fillRect(updateRect)
        this.fillRect(enterRect.append("rect"))
        exitRect.remove()

        var updateText = svg.selectAll("text").data(this.dataSet) // -- 繪製數字 --
        var enterText = updateText.enter()
        var exitText = updateText.exit()

        this.fillText(updateText)
        this.fillText(enterText.append("text"))
        exitText.remove()

        
    },


  }
}
</script>

<style>

  .service-stat {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    width: 80%;
    padding: 0 0 0 110px;
  }

  .rectWrapper {
    display: flex;
    align-items: center;
    width: 100%;
    background: #fff;
    padding: 30px 0;
  }

  .rectChart {
    flex: 3;
  }

  .label-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
  }

  .label-list li {
    font-size: 1.2rem;
    line-height: 2rem;
    font-weight: 500;
  }

  @media (max-width:768px) {
    .rectWrapper {
      flex-direction: column;
    }
  }

</style>
