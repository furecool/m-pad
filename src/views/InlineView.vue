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
              <div class="card-cate" v-if="card.clientCate == '一般'"></div>
              <div class="card-cate" v-if="card.clientCate == '預填'">S</div>
              <div class="card-cate" v-if="card.clientCate == 'VIP'" style="color: rgb(47, 196, 255);">V</div>
              <div class="card-number">{{card.callNum}}</div>
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
      getTime: 500,
      warnTime: 360,
      cate: [
        "一般收付",
        "服務台",
        "外匯"
      ],
      info: [],
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
    //     that.info = res.data.inline
    //   })
    //   .catch(function(err) { 
    //       console.log(err)
    //   })
    // }
    // clearInterval(setInterval(getInfo, that.getTime))
    // getInfo()
    // setInterval(getInfo, that.getTime)

    this.info = this.json.inline
  },
  methods: {
    infoCate(item) {
      let arr = []
      this.info.forEach(function(card) {
        if(card.serveCate == item) {
          arr.push(card)
        }
      })
      return arr
    },
    waitMin(card) {
      let min = Math.floor(card.waitT /60)
      window.sec = Math.floor(((card.waitT /60) - min)*60)
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
