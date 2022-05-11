<template>
  <div class="counter">

      <div class="content">

        <!-- ================ cards ================ -->

        <div class="cards-box">
          <div class="cards">
            <div class="scroll">

              <div v-for="card in info" :key="card.id">

                  <div class="card" v-if="card.counterId || offLine == true" @click="sendCurrCard(card)">
                    
                      <div class="row-1">
                        <div class="number" :class="{'inactive-number': !card.counterName}">{{card.counterNum}}</div>
                        <div class="name">{{card.counterName}}</div>
                        <div class="sign-in">{{card.signIn}}</div>
                      </div>
                      <div class="serve-t" v-if="card.serveGroup" :class="{'warn': card.workT>=420}">{{servMin(card)}} : {{servSec(card)}}</div>
                      <div class="card-bar">
                        <div class="serve-g" v-if="card.serveGroup">{{card.serveGroup}}</div>
                        <div class="status" v-if="card.status">{{card.status}}</div>
                        <div class="inactive-status" v-if="!card.counterId">離線中</div>
                      </div>
                    
                  </div>

              </div>

            </div>
          </div>
          <div class="offline-btn">
            <img src="../../public/img/toggle-off.svg" alt="" height="25" v-if="offLine" @click="toggleOffLine">
            <img src="../../public/img/toggle-on.svg" alt="" height="25" v-if="!offLine" @click="toggleOffLine">
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
                <component :is="currentService" :obj = currentCard :tData = tData></component>
              </keep-alive>                          
            </div>

          </div>
          
        </div>

      </div>

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
      offLine: true,
      getTime: 500,
      currentService: "ServiceTarget",
      currentCard: {},
      info: [],
      tData: {},
      // tData: {
      //   "waitTMax": 1200,
      //   "waitTMin": 0,
      //   "workTMax": 1800,
      //   "workTMin": 0,
      //   "breakTMax": 600,
      //   "breakTMin": 0,
      //   "serveP": 15,
      //   "avgPoint": 10,
      //   "sati": 5
      // },
      json: {
          "inline": [
              {
                  "callNum":"1005",
                  "clientCate":"預填",
                  "serveCate":"一般收付",
                  "waitT":168
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"6103",
                  "clientCate":"VIP",
                  "serveCate":"服務台",
                  "waitT":379
              },
              {
                  "callNum":"6308",
                  "clientCate":"一般",
                  "serveCate":"服務台",
                  "waitT":768
              },
              {
                  "callNum":"8305",
                  "clientCate":"一般",
                  "serveCate":"外匯",
                  "waitT":56
              },
              {
                  "callNum":"1005",
                  "clientCate":"預填",
                  "serveCate":"一般收付",
                  "waitT":168
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"6103",
                  "clientCate":"VIP",
                  "serveCate":"服務台",
                  "waitT":379
              },
              {
                  "callNum":"6308",
                  "clientCate":"一般",
                  "serveCate":"服務台",
                  "waitT":768
              },
              {
                  "callNum":"8305",
                  "clientCate":"一般",
                  "serveCate":"外匯",
                  "waitT":56
              },
              {
                  "callNum":"1005",
                  "clientCate":"預填",
                  "serveCate":"一般收付",
                  "waitT":168
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"6103",
                  "clientCate":"VIP",
                  "serveCate":"服務台",
                  "waitT":379
              },
              {
                  "callNum":"6308",
                  "clientCate":"一般",
                  "serveCate":"服務台",
                  "waitT":768
              },
              {
                  "callNum":"8305",
                  "clientCate":"一般",
                  "serveCate":"外匯",
                  "waitT":56
              },
              {
                  "callNum":"1005",
                  "clientCate":"預填",
                  "serveCate":"一般收付",
                  "waitT":168
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"1310",
                  "clientCate":"一般",
                  "serveCate":"一般收付",
                  "waitT":336
              },
              {
                  "callNum":"6103",
                  "clientCate":"VIP",
                  "serveCate":"服務台",
                  "waitT":379
              },
              {
                  "callNum":"6308",
                  "clientCate":"一般",
                  "serveCate":"服務台",
                  "waitT":768
              },
              {
                  "callNum":"8305",
                  "clientCate":"一般",
                  "serveCate":"外匯",
                  "waitT":56
              }
          ],
          "counter": [
              {
                  "counterNum":"1",
                  "counterName":"陳蘭麗",
                  "signIn":"08:59",
                  "serveGroup":"VR-服",
                  "status":"等待",
                  "workT": 0,
                  "counterId":"134859",
                  "waitT":435,
                  "breakT":60,
                  "serveP":11,
                  "sati":3,
                  "avgPoint":7
              },
              {
                  "counterNum":"2",
                  "counterName":"湯美茱",
                  "signIn":"08:48",
                  "serveGroup":"VR-外",
                  "status":"暫停",
                  "workT":408,
                  "counterId":"135637",
                  "waitT":635,
                  "breakT":135,
                  "serveP":4,
                  "sati":2,
                  "avgPoint":5
              },
              {
                  "counterNum":"3",
                  "counterName":"李千英",
                  "signIn":"08:59",
                  "serveGroup":"外-服",
                  "status":"服務中",
                  "workT":479,
                  "counterId":"139890",
                  "waitT":390,
                  "breakT":195,
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
                  "waitT":640,
                  "breakT":150,
                  "serveP":7,
                  "sati":5,
                  "avgPoint":6
              },
              {
                  "counterNum":"5",
                  "counterName":"張志豪",
                  "signIn":"08:59",
                  "serveGroup":"VR-服",
                  "status":"等待",
                  "workT": 660,
                  "counterId":"134845",
                  "waitT":875,
                  "breakT":120,
                  "serveP":11,
                  "sati":3,
                  "avgPoint":7
              },
              {
                  "counterNum":"6",
                  "counterName":"李宏恩",
                  "signIn":"08:59",
                  "serveGroup":"VR-服",
                  "status":"等待",
                  "workT": 600,
                  "counterId":"134727",
                  "waitT":575,
                  "breakT":150,
                  "serveP":8,
                  "sati":2,
                  "avgPoint":6
              },
              {
                  "counterNum":"7",
                  "counterName":"",
                  "signIn":"",
                  "serveGroup":"",
                  "status":"",
                  "workT":"",
                  "counterId":"",
                  "waitT":"",
                  "breakT":"",
                  "serveP":"",
                  "sati":"",
                  "avgPoint":""
              },
              {
                  "counterNum":"8",
                  "counterName":"",
                  "signIn":"",
                  "serveGroup":"",
                  "status":"",
                  "workT":"",
                  "counterId":"",
                  "waitT":"",
                  "breakT":"",
                  "serveP":"",
                  "sati":"",
                  "avgPoint":""
              },
              {
                  "counterNum":"9",
                  "counterName":"",
                  "signIn":"",
                  "serveGroup":"",
                  "status":"",
                  "workT":"",
                  "counterId":"",
                  "waitT":"",
                  "breakT":"",
                  "serveP":"",
                  "sati":"",
                  "avgPoint":""
              }
          ]
      },
    }
  },
  created() {
    // let that = this
    // // let url = 'http://localhost:2211/api/visualdata'
    // let url = '/info.json'
    // // let url = 'Api/api/visualdata'
    // function getInfo() {
    //   that.$ajax.get(url)
    //   .then(function(res) {
    //     that.info = res.data.counter
    //     // that.tData = res.data.tData
    //     // 或在此計算 tData
    //     that.tData.waitTMax = Math.max.apply(null, that.info.map(function (o) {
    //       return o.waitT;
    //       }))
    //     that.tData.waitTMin = Math.min.apply(null, that.info.map(function (o) {
    //       return o.waitT;
    //       }))
    //     that.tData.breakTMax = Math.max.apply(null, that.info.map(function (o) {
    //       return o.breakT;
    //       }))
    //     that.tData.breakTMin = Math.min.apply(null, that.info.map(function (o) {
    //       return o.breakT;
    //       }))
    //     that.tData.workTMax = Math.max.apply(null, that.info.map(function (o) {
    //       return o.workT;
    //       }))
    //     that.tData.workTMin = Math.min.apply(null, that.info.map(function (o) {
    //       return o.workT;
    //       }))
    //     that.tData.serveP = Math.max.apply(null, that.info.map(function (o) {
    //       return o.serveP;
    //       }))
    //     that.tData.avgPoint = 10;
    //     that.tData.sati = 5;

    //   })
    //   .catch(function(err) { 
    //       console.log(err)
    //   })
    // }
    // clearInterval(setInterval(getInfo, that.getTime))
    // getInfo()
    // setInterval(getInfo, that.getTime)

    this.info = this.json.counter
    this.tData.waitTMax = Math.max.apply(null, this.info.map(function (o) {
      return o.waitT;
      }))
    this.tData.waitTMin = Math.min.apply(null, this.info.map(function (o) {
      return o.waitT;
      }))
    this.tData.breakTMax = Math.max.apply(null, this.info.map(function (o) {
      return o.breakT;
      }))
    this.tData.breakTMin = Math.min.apply(null, this.info.map(function (o) {
      return o.breakT;
      }))
    this.tData.workTMax = Math.max.apply(null, this.info.map(function (o) {
      return o.workT;
      }))
    this.tData.workTMin = Math.min.apply(null, this.info.map(function (o) {
      return o.workT;
      }))
    this.tData.serveP = Math.max.apply(null, this.info.map(function (o) {
      return o.serveP;
      }))
    this.tData.avgPoint = 10;
    this.tData.sati = 5;
    
  },
  watch: {
    info: function() {
      if(JSON.stringify(this.currentCard) === '{}') {
        this.currentCard = this.info[0]
      }
    },
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
    toggleOffLine() {
      this.offLine = !this.offLine
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
    padding: 10px 0 0 0;
    /* background-color: rgba(0, 0, 0, .15); */
    position: absolute;
    left: 40px;
    right: 40px;
    bottom: 60px;
    top: 105px;
  }

  /* ----------------------- card ----------------------- */

  .offline-btn {
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    font-weight: bold;
    flex: 1;
    margin: 5px 10px 0;
  }
  .offline-btn i {
    font-size: 24px;
  }
  .counter .cards {
    flex: 1;
    display: flex;
    overflow-x: auto;
    margin-left: 10px;
    margin-right: 10px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-left: 10px;
  }
  .counter .scroll > div:first-child .card {
    margin-left: 0px;
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
    background-color: #b1b1b1;
    /* background-color: rgb(226, 226, 226); */
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 10px;
  }

  .service-chart-nav {
    width: 100%;
    display: flex;
    justify-content: start;
    font-weight: bold;
    letter-spacing: 2px;
    color: #fff;
    text-decoration: none;
    margin-bottom: 20px;
  }

  .service-chart-content {
    width: 100%;
    display: flex;
  }

  .service {
    width: 160px;
    display: flex;
    align-items: center;
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

  .chart {
    width: 100%;
    margin-left: 20px;
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