<template>
  <div class="inline">

    <div class="wrapper">

      <div class="content" v-for="item in cate" :key="item.id">

        <div class="cate">
          <p>{{item}}</p>
        </div>

        <div class="cards">
          <div class="scroll">
            <div class="card" v-for="card in infoCate(item)" :key="card.id">
              <div class="card-bar"></div>
              <div class="card-cate" v-if="card.客戶類別 == '一般'"></div>
              <div class="card-cate" v-if="card.客戶類別 == '預填'">S</div>
              <div class="card-cate" v-if="card.客戶類別 == 'VIP'" style="color: rgb(47, 196, 255);">V</div>
              <div class="card-number">{{card.叫號號碼}}</div>
              <div class="card-time">{{waitMin(card)}} : {{waitSec(card)}}</div>
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
      cate: [
        "一般收付",
        "服務台",
        "外匯"
      ],
      info: [
        {
            "叫號號碼":"1005",
            "客戶類別":"預填",
            "服務類別":"一般收付",
            "等候時間":168,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"1310",
            "客戶類別":"一般",
            "服務類別":"一般收付",
            "等候時間":336,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"1310",
            "客戶類別":"一般",
            "服務類別":"一般收付",
            "等候時間":336,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"1310",
            "客戶類別":"一般",
            "服務類別":"一般收付",
            "等候時間":336,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"1310",
            "客戶類別":"一般",
            "服務類別":"一般收付",
            "等候時間":336,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"1310",
            "客戶類別":"一般",
            "服務類別":"一般收付",
            "等候時間":336,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"1310",
            "客戶類別":"一般",
            "服務類別":"一般收付",
            "等候時間":336,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"1310",
            "客戶類別":"一般",
            "服務類別":"一般收付",
            "等候時間":336,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"6103",
            "客戶類別":"VIP",
            "服務類別":"服務台",
            "等候時間":379,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"6308",
            "客戶類別":"一般",
            "服務類別":"服務台",
            "等候時間":768,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        },
        {
            "叫號號碼":"8305",
            "客戶類別":"一般",
            "服務類別":"外匯",
            "等候時間":56,
            "取號日期":"2018.09.19",
            "取號時間":"09:26:52..."
        }
      ]
    }
  },
  methods: {
    infoCate(item) {
      let arr = []
      this.info.forEach(function(card) {
        if(card.服務類別 == item) {
          arr.push(card)
        }
      })
      return arr
    },
    waitMin(card) {
      let min = Math.floor(card.等候時間 /60)
      window.sec = Math.floor(((card.等候時間 /60) - min)*60)
      return min.toString().padStart(2,'0');;
    },
    waitSec() {
      return  window.sec.toString().padStart(2,'0');
    },
    colorPeople(item) {
      let vm = this
      vm.waitingP = 0
      let color
      this.info.forEach(function(card) {
        if(card.服務類別 == item) {
          vm.waitingP += 1
        }
      })
      if(vm.waitingP >= 5) {
        color = '#d70c18';
      } else {
        color = 'white';
      }
      return "font-weight:bold;color:" + color;
    }
  },

}
</script>

<style>

  .wrapper {
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
    justify-content: space-between;
    position: relative;
  }

  .inline .card-bar {
    width: 100%;
    height: 5px;
    background-color: #d70c18;
  }

  .inline .card-cate {
    color: rgb(255, 143, 38);
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 6px;
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
    margin-bottom: 2px;
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
