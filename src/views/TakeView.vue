<template>
  <div class="take">
    <div class="wrapper">
      <div class="content">
        <div class="take-box">
          <div class="take-box-title">
            <div class="take-box-title-item">取號</div>
            <div class="take-box-title-item">服務類別</div>
            <div class="take-box-title-item">叫號號碼</div>
            <div class="take-box-title-item">等待人數</div>
          </div>
          <div class="take-box-data">
            <div class="take-box-data-row" v-for="cate in $store.state.cates" :key="cate.id">
              <div class="take-box-data-item">
                <button class="btn-take" @click="takeNumberShowFunc(cate)">取號</button>
                <transition name="btn-popup">
                  <div class="btn-popup" v-if="takeNumberShow(cate)">
                    <button class="btn-normal" @click="takeNumber(cate, 'normal')">一般</button>
                    <button class="btn-prefill" @click="takeNumber(cate, 'prefill')">預填</button>
                    <button class="btn-vip" @click="takeNumber(cate, 'vip')">VIP</button>
                  </div>
                </transition>
              </div>
              <div class="take-box-data-item">{{cate}}</div>
              <div class="take-box-data-item" v-text="number(cate)"></div>
              <div class="take-box-data-item" v-text="waiting(cate)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'TakeView',

  data() {
    return {
      currentCate: null
    }
  },
  methods: {
    takeNumberShowFunc(cate) {
      if(this.currentCate == cate) {
        this.currentCate = false
      } else {
        this.currentCate = cate
      }      
    },
    takeNumberShow(cate) {
      if(this.currentCate == cate) {
        return true
      }      
    },
    takeNumber(cate, client) {
      let obj = {
              callNum: this.number(cate)+1,
              clientCate: client,
              serveCate: cate,
              waitT: 168
          }
      this.$store.state.infoInline.push(obj)
    },
    number(cate) {
      let arr = []
      let num = 0
      this.$store.state.infoInline.forEach(function(card) {
        if(card.serveCate == cate) {
          arr.push(card)
          num = arr[arr.length-1].callNum
        }
      })
      return num
    },
    waiting(cate) {
      let arr = []
      this.$store.state.infoInline.forEach(function(card) {
        if(card.serveCate == cate) {
          arr.push(card)
        }
      })
      return arr.length
    }
  }
  
}
</script>

<style>

  .take .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .take .content {
    width: 90%;
    background: #fff;
  }
  .take .content img{
    margin: 0 auto 60px;
    width: 100%;
  }

  .take-box {
    margin: 20px;
  }

  .take-box-title {
    display: flex;
  }
  .take-box-title-item {
    flex: 1;
    display: flex;
    justify-content: start;
    font-weight: bold;
    margin: 7px;
  }

  .take-box-data-row {
    display: flex;
    border-top: 1px solid #ccc;
  }
  .take-box-data-item {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: start;
    font-weight: 500;
    margin: 10px 7px;
    line-height: 40px;
  }
  .take-box-data-item button {
    position: relative;
    height: 40px;
    width: 60px;
    font-size: 16px;
    line-height: 40px;
    color: #fff;
    border: none;
    border-radius: 5px;
    z-index: 1;
    margin-right: 3px;
  }
  .take-box-data-item .btn-take {
    background: #d70c18;
    box-shadow: 1px 1px 0px #7c0008;
  }
  .btn-popup {
    position: absolute;
    left: 60px;
    width: 200px;
  }
  .take-box-data-item .btn-normal {
    background: #9c9c9c;
    box-shadow: 1px 1px 0px #505050;
  }
  .take-box-data-item .btn-prefill {
    background: #ec930d;
    box-shadow: 1px 1px 0px #c56423;
  }
  .take-box-data-item .btn-vip {
    background: #5ab7d3;
    box-shadow: 1px 1px 0px #3c7a8d;
  }
  .take-box-data-item button:active {
    box-shadow: none;
  }
  
  .btn-popup-enter-active,
  .btn-popup-leave-active {
    transition: all 0.2s;
  }
  .btn-popup-enter,
  .btn-popup-leave-to {
      transform: translateX(-60px);
      opacity: 0;
  }

</style>
