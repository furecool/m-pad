<template>
  <div class="inline">
    <div class="wrapper">
      <div class="content" v-for="item in $store.state.cates" :key="item.id">

        <div class="cate">
          <p>{{item}}</p>
        </div>

        <div class="cards">
          <div class="scroll">
            <div class="card" v-for="card in infoCate(item)" :key="card.id">
              <div class="card-cate" v-if="card.clientCate == 'normal'"></div>
              <div class="card-cate" v-if="card.clientCate == 'prefill'">S</div>
              <div class="card-cate" v-if="card.clientCate == 'vip'" style="color: rgb(47, 196, 255);">V</div>
              <div class="card-number" v-text="callNum(card)"></div>
              <div class="card-time"><p :style="waitTColor(card)">{{waitMin(card)}} : {{waitSec(card)}}</p></div>
            </div>
          </div>
          
        </div>

        <div class="waiting">
          <div class="people">
            <p :style="colorPeople(item)">{{waitingP}}</p><p>人</p>
          </div>        
          <p>等候</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'InlineView',
  components: {
  },
  data() {
    return {
      warnTime: 360,        
    }
  },
  created() {
    
  },
  methods: {
    infoCate(item) {
      let arr = []
      this.$store.state.infoInline.forEach(function(card) {
        if(card.serveCate == item) {
          arr.push(card)
        }
      })
      return arr
    },
    waitMin(card) {
      let min = Math.floor(card.waitT /60)
      window.sec = card.waitT - min*60
      return min.toString().padStart(2,'0');
    },
    waitSec() {
      return  window.sec.toString().padStart(2,'0');
    },
    colorPeople(item) {
      let vm = this
      vm.waitingP = 0
      let color
      this.$store.state.infoInline.forEach(function(card) {
        if(card.serveCate == item) {
          vm.waitingP += 1
        }
      })
      if(vm.waitingP >= 5) {
        color = '#d70c18';
      } else {
        color = 'white';
      }
      return "font-weight:bold;color:" + color;
    },
    waitTColor(card) {
      if(card.waitT >= this.warnTime) {
        return 'color: #d70c18;'
      }    
    },
    callNum(card) {
      return card.callNum.toString().padStart(4, '0')
    }
  },

}
</script>

<style>

  .inline .wrapper {
    display: flex;
    flex-direction: column;
  }

  .inline .content {
    display: flex;
    align-items: center;
    margin: 0 auto 3px;
    background-color: rgba(0, 0, 0, .15);
    width: 90%;
    height: 70px;
    color: #fff;
  }

  /* ----------------------- cate ----------------------- */

  .inline .cate {
    width: 130px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  /* ----------------------- cards ----------------------- */

  .inline .cards {
    display: flex;
    overflow-x: auto;
    flex: 1;    
  }

  .inline .cards::-webkit-scrollbar {
    display: none;
  }

  .inline .scroll {
    display: flex;
  }

  .inline .card {
    height: 50px;
    width: 100px;
    background-color: #fff;
    margin: 0 5px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border-top: #d70c18 5px solid;
  }

  .inline .card-cate {
    color: rgb(255, 143, 38);
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 4px;
    left: 10px;
  }

  .inline .card-number {
    color: #1e1e1e;
    font-size: 18px;
    font-weight: bold;
  }

  .inline .card-time {
    color: #727272;
    font-size: 14px;
    margin: 2px;
  }

  /* ----------------------- waiting ----------------------- */

  .inline .waiting {
    width: 40px;
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    letter-spacing: 2px;
  }

  .inline .people {
    display: flex;
    justify-content: space-around;
  }
  
</style>
