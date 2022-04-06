<template>
  <div class="counter">

    <!-- <div class="wrapper"> -->

      <div class="content">

        <!-- ================ cards ================ -->

        <div class="cards">
          <div class="scroll">
            <div class="card" v-for="card in info" :key="card.id" @click="sendCurrCard(card)">
              <div class="row-1">
                <div class="number" :class="{'inactive-number': !card.櫃員姓名}">{{card.服務櫃號}}</div>
                <div class="name">{{card.櫃員姓名}}</div>
                <div class="sign-in">{{card.系統登入時間}}</div>
              </div>
              <div class="serve-t" v-if="card.可服務群組" :class="{'warn': card.已服務時長>=420}">{{servMin(card)}} : {{servSec(card)}}</div>
              <div class="card-bar">
                <div class="serve-g" v-if="card.可服務群組">{{card.可服務群組}}</div>
                <div class="status" :class="{'inactive-status': !card.櫃員姓名}">{{card.服務狀態}}</div>
              </div>
            </div>
          </div>          
        </div>

        <!-- ================ service-chart ================ -->

        <div class="service-chart">

          <div class="service-chart-nav">
            <div class="router">
                <div class="three-d-btn" @click="currentService ='ServiceTarget'" :class="{ 'active': currentService =='ServiceTarget' }">服務指標</div>
                <div class="three-d-btn" @click="currentService ='ServiceStat'" :class="{ 'active': currentService =='ServiceStat' }">服務統計</div>          
            </div>
          </div>

          <div class="service-chart-content">    

            <div class="service">
              <div class="service-col">
                <div>櫃號</div>
                <div>員編</div>
                <div>姓名</div>
                <div>時間</div>
              </div>
              <div class="service-col">
                <div>{{currentCard.服務櫃號}}</div>
                <div>{{currentCard.櫃員員編}}</div>
                <div>{{currentCard.櫃員姓名}}</div>
                <div v-if="currentCard.櫃員員編">{{servMin(currentCard)}} : {{servSec(currentCard)}}</div>
              </div>              
            </div>

            <div class="chart">
              <keep-alive>
                <component :is="currentService" :obj = obj></component> 
              </keep-alive>                          
            </div>

          </div>
          
        </div>

      </div>

    <!-- </div> -->

  </div>
</template>
<script>
import ServiceTarget from '@/components/ServiceTarget.vue'
import ServiceStat from '@/components/ServiceStat.vue'
export default {

  name: 'CounterView',
  components: {
    ServiceTarget,
    ServiceStat
  },
  data() {
    return {
      obj: {
        waitT: 435,
        workT: 0,
        breakT: 60,
        avgPoint: 7,
        serveP: 11,
        sati: 3,
      },
      currentService: "ServiceTarget",
      currentCard: {
            "服務櫃號":"1",
            "櫃員姓名":"陳蘭麗",
            "系統登入時間":"08:59",
            "可服務群組":"VR-服",
            "服務狀態":"服務中",
            "已服務時長": 0,
            "櫃員員編":"134859",
            "平均等待時間":435,
            "平均暫停時間":60,
            "已服務人數":11,
            "客戶滿意度":3,
            "綜合指標數值":7
        },
      info:[
        {
            "服務櫃號":"1",
            "櫃員姓名":"陳蘭麗",
            "系統登入時間":"08:59",
            "可服務群組":"VR-服",
            "服務狀態":"等待",
            "已服務時長": 0,
            "櫃員員編":"134859",
            "平均等待時間":435, // "07:15"
            "平均暫停時間":60, // "01:00"
            "已服務人數":11,
            "客戶滿意度":3,
            "綜合指標數值":7
        },
        {
            "服務櫃號":"2",
            "櫃員姓名":"湯美茱",
            "系統登入時間":"08:48",
            "可服務群組":"VR-服",
            "服務狀態":"暫停",
            "已服務時長":408,
            "櫃員員編":"134859",
            "平均等待時間":635, // "10:35"
            "平均暫停時間":135, // "02:15"
            "已服務人數":4,
            "客戶滿意度":2,
            "綜合指標數值":5
        },
        {
            "服務櫃號":"3",
            "櫃員姓名":"李千英",
            "系統登入時間":"08:59",
            "可服務群組":"VR-服",
            "服務狀態":"服務中",
            "已服務時長":479,
            "櫃員員編":"134859",
            "平均等待時間":390, // "06:30"
            "平均暫停時間":195, // "03:15"
            "已服務人數":10,
            "客戶滿意度":4,
            "綜合指標數值":7
        },
        {
            "服務櫃號":"4",
            "櫃員姓名":"劉力皇",
            "系統登入時間":"08:48",
            "可服務群組":"VR-服",
            "服務狀態":"服務中",
            "已服務時長":1475,
            "櫃員員編":"134859",
            "平均等待時間":640, // "10:40"
            "平均暫停時間":150, // "02:30"
            "已服務人數":7,
            "客戶滿意度":5,
            "綜合指標數值":6
        },
        {
            "服務櫃號":"5",
            "櫃員姓名":"",
            "系統登入時間":"",
            "可服務群組":"",
            "服務狀態":"離線中",
            "已服務時長":"",
            "櫃員員編":"",
            "平均等待時間":"",
            "平均暫停時間":"",
            "已服務人數":"",
            "客戶滿意度":"",
            "綜合指標數值":""
        },
        {
            "服務櫃號":"6",
            "櫃員姓名":"",
            "系統登入時間":"",
            "可服務群組":"",
            "服務狀態":"離線中",
            "已服務時長":"",
            "櫃員員編":"",
            "平均等待時間":"",
            "平均暫停時間":"",
            "已服務人數":"",
            "客戶滿意度":"",
            "綜合指標數值":""
        },
        {
            "服務櫃號":"7",
            "櫃員姓名":"",
            "系統登入時間":"",
            "可服務群組":"",
            "服務狀態":"離線中",
            "已服務時長":"",
            "櫃員員編":"",
            "平均等待時間":"",
            "平均暫停時間":"",
            "已服務人數":"",
            "客戶滿意度":"",
            "綜合指標數值":""
        },
      ],
    }
  },
  methods: {
    sendCurrCard(card) {
      if(card.櫃員姓名) {
        this.currentCard = card
        this.obj = {
          counterNo: card.服務櫃號,
          name: card.櫃員姓名,
          waitT: card.平均等待時間,
          workT: card.已服務時長,
          breakT: card.平均暫停時間,
          avgPoint: card.綜合指標數值,
          serveP: card.已服務人數,
          sati: card.客戶滿意度,
        }
      }      
    },
    servMin(card) {
      let min = Math.floor(card.已服務時長 /60)
      window.sec = Math.floor(((card.已服務時長 /60) - min)*60)
      return min.toString().padStart(2,'0');
    },
    servSec() {
      return  window.sec.toString().padStart(2,'0');
    },
  },

}
</script>
<style>

  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .counter .content {
    padding: 20px 0;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, .15);
    width: 90%;
    height: 73vh;
  }

  /* ----------------------- card ----------------------- */

  .counter .cards {
    display: flex;
    overflow-x: auto;
    width: 95%;
    margin: 0 auto;
  }
  .counter .cards::-webkit-scrollbar {
    display: none;
  }
  .counter .scroll {
    display: flex;
  }
  .counter .card {
    font-weight: bold;
    color: #1e1e1e;
    height: 80px;
    width: 150px;
    background-color: #fff;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .counter .row-1 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: relative;
    margin: 5px auto 0;
  }
  .counter .number {
    color: #fff;
    position: absolute;
    left: 10px;
    z-index: 0;
  }
  .counter .number:before {
    content:"";
    display: block;
    /* background: #e2565d; */
    /* background: #f7e648; */
    /* background: #3657c2; */
    background: #d70c18;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    top: -3px; right: 0; bottom: 0; left: -8px;
    z-index: -1;
  }
  .counter .inactive-number:before {
    background: rgb(226, 226, 226);
  }
  .counter .name {
    position: relative;
    top: -3px;
    left: 20px;
    font-size: 1.2rem;
  }
  .counter .sign-in {
    font-size: 1.2rem;
  }

  .counter .serve-t {
    font-size: .9rem;
    color: #727272;
  }
  .counter .warn {
    color: #d70c18;
  }

  .counter .card-bar {
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-color: rgb(226, 226, 226);
  }
  /* .counter .serve-g {} */
  .counter .status {
    color: #d70c18;
  }
  .counter .inactive-status {
    color: #727272;
  }

  /* ----------------------- service-chart ----------------------- */

  .service-chart {
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
  }

  .service-chart-nav {
    width: 100%;
    display: flex;
    justify-content: start;
    font-weight: bold;
    letter-spacing: 2px;
    color: #fff;
    text-decoration: none;
  }

  .service-chart-content {
    width: 90%;
    display: flex;
    margin: 0px 0;
  }

  .service {
    width: 20%;
    display: flex;
    align-items: center;
    margin: 20px auto;
    height: 150px;
  }

  .service-col {
    height: 100%;
    width: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-weight: bold;
    font-size: 1.3rem;
  }

  .service-col div {
    height: 20px;
  }

  .chart {
    width: 80%;
  }

  .chart img {
    width: 100%;
  }
  

  .counter .three-d-btn {
    line-height:30px;
    position: relative;
    background: linear-gradient(to bottom,  #838383 31%,#d6d6d6 100%);
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .2),
                3px 5px 3px 0px rgba(0, 0, 0, .3);
    width: 120px;
    height: 30px;
    /* width: 100px;
    height: 25px; */
    margin: 0 10px 0 0;
    transition:  all 0.1s ease-in-out;
    border: none;
    border-radius: 5em;
  }

  .counter .three-d-btn:before {
    content: "";
    width: 110px; 
    height: 20px; 
    /* width: 90px; 
    height: 16px;  */
    display: block; 
    position: absolute;
    top:0px;
    left: 5px;
    border: none;
    border-radius: 5em;
    background: linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(255,255,255,0.7) 8%,rgba(255,255,255,0) 100%);
    transition:  all 0.1s ease-in-out;
  }

  .counter .active{
    background: linear-gradient(to bottom,  #a81818 31%,#ec8c8c 100%);
  }

</style>