<template>
  <div class="counter">
      <div class="content">
        <div class="call-card-close" v-if="callCardShow" @click="callCardClose"></div>

        <!-- ================ cards ================ -->

        <div class="cards-box">
          <transition name="callCardShow-fade">
            <div id="callCard" class="call-card" v-show="callCardShow">
              <div class="three-d-btn" @click="callNow">立即叫號</div>
              <div class="three-d-btn" @click="callAssign">指定叫號</div>
            </div>
          </transition>
          <div class="cards">
            <div class="scroll">

              <div v-for="card in $store.state.infoCounter" :key="card.id">

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
          <div class="call-assign" v-if="callAssignShow">
            <div class="call-assign-list">
              <div class="call-assign-close" @click="callAssignClose">X</div>
              <div class="call-assign-list-title">指定叫號列表</div>
              <div class="call-assign-list-nav">
                <div class="call-assign-list-nav-num">
                  <div class="call-assign-list-nav-num-title">
                    號碼: {{currentAssign.callNum}}
                  </div>
                </div>
                <div class="call-assign-list-nav-cate">
                  <div>服務類別</div>
                  <select class="call-assign-list-nav-cate-dropdown" v-model="currentServeCate">
                    <option v-for="cate in $store.state.cates" :key="cate.id">{{cate}}</option>
                  </select>
                </div>
                <div class="call-assign-list-nav-assign">
                  <div class="three-d-btn" @click="assignFunc">指 定</div>
                </div>
              </div>
              <div class="call-assign-list-content">
                <div class="call-assign-list-content-header">
                  <div class="call-assign-list-content-header-item">叫號號碼</div>
                  <div class="call-assign-list-content-header-item">客戶種類</div>
                  <div class="call-assign-list-content-header-item">服務類別</div>
                  <div class="call-assign-list-content-header-item">取號時間</div>
                  <div class="call-assign-list-content-header-item">等待時間</div>
                </div>
                <div class="call-assign-list-content-data">
                  <div class="call-assign-list-content-row" v-for="card in infoCate()" :key="card.id" @click="assignCard(card)" :class="{ assignActive: currentAssign == card }">
                    <div class="call-assign-list-content-row-item" v-text="callNum(card)"></div>
                    <div class="call-assign-list-content-row-item" v-if="card.clientCate == 'normal'">一般</div>
                    <div class="call-assign-list-content-row-item" v-if="card.clientCate == 'prefill'">預填</div>
                    <div class="call-assign-list-content-row-item" v-if="card.clientCate == 'vip'">VIP</div>
                    <div class="call-assign-list-content-row-item" v-text="currentServeCate"></div>
                    <div class="call-assign-list-content-row-item">2022-07-01-14:45</div>
                    <div class="call-assign-list-content-row-item">等待時間</div>
                  </div>
                </div>
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
      currentService: "ServiceTarget",
      currentCard: {},
      callCardShow: false,
      callAssignShow: false,
      tData: {},
      currentServeCate: '臺幣交易',
      currentAssign: {},
      infoCounter: []
    }
  },
  activated() {
    this.setTdata()
  },
  watch: {
    '$store.state.infoCounter': function() {
      this.setTdata()
    },
  },
  methods: {
    setTdata() {
      if(!this.currentCard.counterName && this.$store.state.infoCounter[0]) {
        this.currentCard = this.$store.state.infoCounter[0]
      }
      this.tData.waitTMax = Math.max.apply(null, this.$store.state.infoCounter.map(function (o) {
        return o.waitT;
        }))
      this.tData.waitTMin = Math.min.apply(null, this.$store.state.infoCounter.map(function (o) {
        return o.waitT;
        }))
      this.tData.breakTMax = Math.max.apply(null, this.$store.state.infoCounter.map(function (o) {
        return o.breakT;
        }))
      this.tData.breakTMin = Math.min.apply(null, this.$store.state.infoCounter.map(function (o) {
        return o.breakT;
        }))
      this.tData.workTMax = Math.max.apply(null, this.$store.state.infoCounter.map(function (o) {
        return o.workT;
        }))
      this.tData.workTMin = Math.min.apply(null, this.$store.state.infoCounter.map(function (o) {
        return o.workT;
        }))
      this.tData.serveP = Math.max.apply(null, this.$store.state.infoCounter.map(function (o) {
        return o.serveP;
        }))
      this.tData.avgPoint = 10;
      this.tData.sati = 5;
    },
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
          if(window.innerWidth - e.targetTouches[0].clientX >= 170) {
            callCard.style.left = (e.targetTouches[0].clientX - 42) + 'px'
          } else {
            callCard.style.left = (e.targetTouches[0].clientX - 160) + 'px'
          }          
          this.callCardShow = true
        }, 500)

        this.currentCard = card

        return false
      }
    },
    callTouchmove () {
      clearTimeout(this.loop)
    },
    callTouchend () {
      clearTimeout(this.loop)
    },
    callNow() {
      alert('立即叫號至櫃台: ' + this.currentCard.counterNum + '\n櫃員: ' + this.currentCard.counterName)
      this.callCardShow = false
    },
    callAssign() {
      this.callAssignShow = true
      this.callCardShow = false
    },
    callAssignClose() {
      this.callAssignShow = false
    },
    infoCate() {
      let vm = this
      let arr = []
      this.$store.state.infoInline.forEach(function(card) {
        if(card.serveCate == vm.currentServeCate) {
          arr.push(card)
        }
      })
      return arr
    },
    callNum(card) {
      return card.callNum.toString().padStart(4, '0')
    },
    assignCard(card) {
      this.currentAssign = card
    },
    assignFunc() {
      if(this.currentAssign.callNum) {
        alert('客戶: ' + this.currentAssign.serveCate + ' - ' + this.currentAssign.callNum + '\n指定至櫃檯: ' + this.currentCard.counterNum + '\n櫃員: ' + this.currentCard.counterName)
      } else {
        alert('請選取欲叫號的客戶。')
      }
      
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
    width: 90%;
    margin: 0 auto 3px;
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
    margin-top: 5px;
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
    /* background: rgba(100, 100, 100, .5); */
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
  .call-assign-list {
    background: #fff;
    border: #888888 2px solid;
    border-radius: 10px;
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .call-assign-list-title {
    /* background: rgb(255, 135, 135); */
    line-height: 50px;
    width: 90%;
    border-bottom: #d70c18 3px solid;
  }
  .call-assign-list-nav {
    /* background: rgb(164, 158, 248); */
    width: 90%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .call-assign-list-nav-cate {
    display: flex;
  }
  .call-assign-list-nav-cate-dropdown {
    width: 120px;
    height: 30px;
    margin-left: 10px;
    font-size: 18px;
  }
  .call-assign-list-nav-cate-dropdown option {
    font-size: 14px;
  }
  .call-assign-list-nav-assign {
    color: #fff;
  }
  .call-assign-list-content {
    border: #999999 2px solid;
    margin-bottom: 40px;
    width: 90%;
  }
  .call-assign-list-content-header {
    background: rgb(120, 240, 136);
    display: flex;
    border-bottom: #999999 2px solid;
  }
  .call-assign-list-content-header-item {
    flex: 1;
    display: flex;
    align-content: center;
    line-height: 35px;
  }
  .call-assign-list-content-data {
    height: 350px;
    overflow-y: scroll;
  }
  .call-assign-list-content-row {
    display: flex;
  }
  .assignActive {
    background: rgb(126, 246, 255);
  }
  .call-assign-list-content-row-item {
    flex: 1;
    display: flex;
    align-content: center;
    line-height: 35px;
  }
  .counter .cards {
    flex: 1;
    display: flex;
    overflow-x: auto;
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