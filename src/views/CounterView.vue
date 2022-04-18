<template>
  <div class="counter">

    <!-- <div class="wrapper"> -->

      <div class="content">

        <!-- ================ cards ================ -->

        <div class="cards">
          <div class="scroll">
            <div class="card" v-for="card in info" :key="card.id" @click="sendCurrCard(card)">
              <div class="row-1">
                <div class="number" :class="{'inactive-number': !card.counterName}">{{card.counterNum}}</div>
                <div class="name">{{card.counterName}}</div>
                <div class="sign-in">{{card.signIn}}</div>
              </div>
              <div class="serve-t" v-if="card.serveGroup" :class="{'warn': card.workT>=420}">{{servMin(card)}} : {{servSec(card)}}</div>
              <div class="card-bar">
                <div class="serve-g" v-if="card.serveGroup">{{card.serveGroup}}</div>
                <div class="status" :class="{'inactive-status': !card.counterName}">{{card.status}}</div>
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
                <div>{{currentCard.counterNum}}</div>
                <div>{{currentCard.counterId}}</div>
                <div>{{currentCard.counterName}}</div>
                <div v-if="currentCard.counterId">{{servMin(currentCard)}} : {{servSec(currentCard)}}</div>
              </div>
            </div>

            <div class="chart">
              <keep-alive>
                <component :is="currentService" :obj = currentCard></component>
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
      currentService: "ServiceTarget",
      currentCard: {},
      info:[
        {
            "counterNum":"1",
            "counterName":"陳蘭麗",
            "signIn":"08:59",
            "serveGroup":"VR-服",
            "status":"等待",
            "workT": 0,
            "counterId":"134859",
            "waitT":435, // "07:15"
            "breakT":60, // "01:00"
            "serveP":11,
            "sati":3,
            "avgPoint":7
        },
        {
            "counterNum":"2",
            "counterName":"湯美茱",
            "signIn":"08:48",
            "serveGroup":"VR-服",
            "status":"暫停",
            "workT":408,
            "counterId":"135637",
            "waitT":635, // "10:35"
            "breakT":135, // "02:15"
            "serveP":4,
            "sati":2,
            "avgPoint":5
        },
        {
            "counterNum":"3",
            "counterName":"李千英",
            "signIn":"08:59",
            "serveGroup":"VR-服",
            "status":"服務中",
            "workT":479,
            "counterId":"139890",
            "waitT":390, // "06:30"
            "breakT":195, // "03:15"
            "serveP":10,
            "sati":4,
            "avgPoint":7
        },
        {
            "counterNum":"4",
            "counterName":"劉力皇",
            "signIn":"08:48",
            "serveGroup":"VR-服",
            "status":"服務中",
            "workT":1475,
            "counterId":"135787",
            "waitT":640, // "10:40"
            "breakT":150, // "02:30"
            "serveP":7,
            "sati":5,
            "avgPoint":6
        },
        {
            "counterNum":"5",
            "counterName":"",
            "signIn":"",
            "serveGroup":"",
            "status":"離線中",
            "workT":"",
            "counterId":"",
            "waitT":"",
            "breakT":"",
            "serveP":"",
            "sati":"",
            "avgPoint":""
        },
        {
            "counterNum":"6",
            "counterName":"",
            "signIn":"",
            "serveGroup":"",
            "status":"離線中",
            "workT":"",
            "counterId":"",
            "waitT":"",
            "breakT":"",
            "serveP":"",
            "sati":"",
            "avgPoint":""
        },
        {
            "counterNum":"7",
            "counterName":"",
            "signIn":"",
            "serveGroup":"",
            "status":"離線中",
            "workT":"",
            "counterId":"",
            "waitT":"",
            "breakT":"",
            "serveP":"",
            "sati":"",
            "avgPoint":""
        },
      ],
    }
  },
  mounted() {
    this.currentCard = this.info[0]
  },
  methods: {
    sendCurrCard(card) {
      if(card.counterName) {
        this.currentCard = card
      }      
    },
    servMin(card) {
      let min = Math.floor(card.workT /60)
      window.sec = Math.floor(((card.workT /60) - min)*60)
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
    height: 100%;
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
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: space-between;
    /* flex-direction: column; */
    padding: 15px 0;
    margin: 0px 0;
  }

  .service {
    width: 160px;
    display: flex;
    align-items: center;
    margin: 20px auto;
    height: 150px;
  }

  .service-col {
    height: 100%;
    width: 100%;
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
    width: 100%;
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