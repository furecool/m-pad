<template>
  <div class="counter">
      <div class="content">
        <div class="call-card-close" v-if="callCardShow" @click="callCardClose"></div>

        <!-- ================ cards ================ -->

        <div class="cards-box">
          <transition name="callCardShow-fade">
            <div id="callCard" class="call-card" v-show="callCardShow">
              <div class="three-d-btn" @click="callCardClose">立即叫號</div>
              <div class="three-d-btn" @click="callAssign">指定叫號</div>
            </div>
          </transition>
          <div class="call-assign" v-if="callAssignShow">
            <img src="../../public/callassign.png" alt="">
            <div class="call-assign-close" @click="callAssignClose"></div>
          </div>
          <div class="cards">
            <div class="scroll">

              <div v-for="card in info" :key="card.id">

                  <div class="card" v-if="card.counterId || offLine == true" @click="sendCurrCard(card)">
                    
                      <div class="row-1">
                        <div class="number" :class="{'inactive-number': !card.counterName}" @touchstart="callTouchstart($event,card)" @touchmove="callTouchmove" @touchend="callTouchend">{{card.counterNum}}</div>
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
      callCardShow: false,
      callAssignShow: false,
      info: [],
      tData: {}
    }
  },
  created() {
    let vm = this
    let url = 'https://furecool.github.io/m-pad/info.json'
    // let url = '/info.json'
    function getInfo() {
      vm.$ajax.get(url)
      .then(function(res) {
        // console.log("connecting...")
        vm.info = res.data.counter
        vm.tData.waitTMax = Math.max.apply(null, vm.info.map(function (o) {
          return o.waitT;
          }))
        vm.tData.waitTMin = Math.min.apply(null, vm.info.map(function (o) {
          return o.waitT;
          }))
        vm.tData.breakTMax = Math.max.apply(null, vm.info.map(function (o) {
          return o.breakT;
          }))
        vm.tData.breakTMin = Math.min.apply(null, vm.info.map(function (o) {
          return o.breakT;
          }))
        vm.tData.workTMax = Math.max.apply(null, vm.info.map(function (o) {
          return o.workT;
          }))
        vm.tData.workTMin = Math.min.apply(null, vm.info.map(function (o) {
          return o.workT;
          }))
        vm.tData.serveP = Math.max.apply(null, vm.info.map(function (o) {
          return o.serveP;
          }))
        vm.tData.avgPoint = 10;
        vm.tData.sati = 5;

      })
      .catch(function(err) {
        console.log(err)
      })
    }
    clearInterval(setInterval(getInfo, this.getTime))
    getInfo()
    setInterval(getInfo, this.getTime)
  },
  mounted() {
        window.addEventListener('contextmenu', function(e){
          e.preventDefault();
        });
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
    callCardClose() {
      this.callCardShow = false
    },
    callTouchstart (e,card) {
      if(card.counterName) {
        this.loop = setTimeout(() => {
          let callCard = document.getElementById("callCard")
          if(e.targetTouches[0].clientX <= 850) {
            callCard.style.left = (e.targetTouches[0].clientX - 42) + 'px'
          } else {
            callCard.style.left = (e.targetTouches[0].clientX - 160) + 'px'
          }          
          this.callCardShow = true
        }, 500)

        return false
      }
    },
    callTouchmove () {
      clearTimeout(this.loop)
    },
    callTouchend () {
      clearTimeout(this.loop)
    },
    callAssign() {
      this.callAssignShow = true
      this.callCardShow = false
    },
    callAssignClose() {
      this.callAssignShow = false
    }
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
  .call-card-close {
    position: absolute;
    z-index: 1;
    /* background: rgba(100, 100, 100, .7); */
    width: 100%;
    height: 100%;
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
  .call-card {
    font-weight: bold;
    letter-spacing: 2px;
    color: #fff;
    text-decoration: none;
    position: absolute;
    top: 35px;
    z-index: 1;
    /* background: rgba(100, 100, 100, .5); */
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  /* .call-card .three-d-btn:active {
    background: linear-gradient(to bottom,  #a81818 31%,#ec8c8c 100%);
  } */
  .call-assign {
    background: rgba(100, 100, 100, .5);
    position: absolute;
    top: 60px;
    z-index: 1;
    width: 100%;
  }
  .call-assign img {
    width: 100%;
    border: #888888 solid 3px;
    border-radius: 10px;
  }
  .call-assign-close {
    position: absolute;
    top: 15px;
    right: 30px;
    /* background: rgba(100, 100, 100, .5); */
    width: 50px;
    height: 50px;
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
    left: 3px;
    z-index: 0;
    width: 25px;
    height: 25px;
  }
  .counter .number:before {
    content:"";
    display: block;
    background: #d70c18;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: absolute;
    top: -3px; right: 0; bottom: 0; left: 0px;
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

  .callCardShow-fade-enter-active,
  .callCardShow-fade-leave-active {
    transition: all 0.2s;
  }
  .callCardShow-fade-enter,
  .callCardShow-fade-leave-to {
      opacity: 0;
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