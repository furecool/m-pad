<template>
  <div id="app">

    <!-- app-header -->
    <div class="app-header">
      <div class="app-header-bg"></div>

      <!-- app-top -->
      <div class="app-top"></div>

      <!-- logo -->
      <div class="logo">      
        <img src="./assets/TSB_logo.png">
        <p class="logo-tsb">台新銀行</p>
        <p class="logo-pab">營業廳經理平版</p>
      </div>

      <!-- nav -->
      <nav>
        <div class="router">
          <router-link to="/">
            <div class="three-d-btn">排隊監控</div>
          </router-link>
          <router-link to="/counter">
            <div class="three-d-btn">櫃台監控</div>
          </router-link>
          <router-link to="/review">
            <div class="three-d-btn">主管覆核</div>
          </router-link>
          <router-link to="/take">
            <div class="three-d-btn">取號功能</div>
          </router-link>
        </div>
        <div class="nav-icon">
          <a href=""><img src="../public/img/envelope.svg" alt="" height="25"></a>
          <a href=""><img src="../public/img/power-off.svg" alt="" height="25"></a>
        </div>
      </nav>

    </div>

    <!-- router-view -->
    <keep-alive>
      <router-view/>
    </keep-alive>    

    <!-- app-footer -->
    <div class="app-footer">
      <div class="bg-r">
        <img src="./assets/TSB_logo_w.png">
        <p class="logo-w-txt">台新銀行</p>
      </div>
      <div class="bg-g">
        <img src="./assets/TSB_logo_g.png">
        <p class="logo-g-txt">台新金控</p>
      </div>
    </div>    

  </div>  
</template>

<script>

export default {

  data() {
    return {
      getTime: 500,
    }
  },
  created() {
    let vm = this
    let url = 'https://furecool.github.io/m-pad/info.json'
    // let url = '/info.json'
    function getInfo() {
      vm.$ajax.get(url)
      .then(function(res) {
        console.log("get data...🚀")
        vm.$store.state.infoInline = res.data.inline
        vm.$store.state.infoCounter = res.data.counter
      })
      .catch(function(err) {
        console.log(err)
      })
    }
    // clearInterval(setInterval(getInfo, this.getTime))
    getInfo()
    // setInterval(getInfo, this.getTime)

    window.addEventListener('contextmenu', function(e){
      e.preventDefault();
    });
  }

}
</script>

<style>

/* #8b8b8b #666666 #818181 #1e1e1e #727272 #ff850d #289cff */

* {
  padding: 0;
  margin: 0;
}
html {
  height: 100vh;
  background: #c9c9c9;
  user-select: none;
  -webkit-user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.app-header {
  height: 106px;
  z-index: 100;
}
.app-header-bg {
  position: fixed;
  background: #c9c9c9;
  width: 100%;
  height: 106px;
  left: 0;
}

/* ----------------------- top / logo ----------------------- */

.app-top {
  position: fixed;
  top: 0;
  width: 100%;
  height: 10px;
  background-color: #d70c18;
}
.logo {
  position: fixed;
  top: 10px;
  margin-left: 50%;
  left: -200px;
  display: flex;
  align-items: center;
  height: 50px;
  background:radial-gradient(circle farthest-side at center,rgb(243, 243, 243), transparent 75%);
}
.logo img {
  width: 35px;
}
.logo-tsb {
  color: #8b8b8b;
  font-size: 1.2em;
  font-weight: 800;
  letter-spacing: 1px;
  margin: 5px;
}
.logo-pab {
  color: #d70c18;
  font-size: 1.7em;
  font-weight: 800;
  letter-spacing: 5px;
  margin: 5px 25px;
}

/* ----------------------- nav ----------------------- */

nav {
  position: fixed;
  top: 60px;
  margin-left: 5%;
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.router {
  display: flex;
}
nav a {
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  text-decoration: none;
}
.three-d-btn {
  line-height:30px;
  position: relative;
  background: linear-gradient(to bottom,  #838383 31%,#d6d6d6 100%);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, .2),
              3px 5px 3px 0px rgba(0, 0, 0, .3);
  width: 120px;
  height: 30px;
  margin: 8px 10px 8px 0;
  transition:  all 0.1s ease-in-out;
  border: none;
  border-radius: 5em;
}
.three-d-btn:before {
  content: "";
  width: 110px;
  height: 20px;
  display: block;
  position: absolute;
  top:0px;
  left: 5px;
  border: none;
  border-radius: 5em;
  background: linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(255,255,255,0.7) 8%,rgba(255,255,255,0) 100%);
  transition:  all 0.1s ease-in-out;
}
.router-link-exact-active .three-d-btn{
  background: linear-gradient(to bottom,  #a81818 31%,#ec8c8c 100%);
}
.nav-icon {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: #fff;
}
.nav-icon a {
  margin-left: 8px;
  display: flex;
}

/* ----------------------- footer ----------------------- */

.app-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
}
.bg-r {
  background-color: #d70c18;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
}
.bg-g {
  background-color: #898989;
  width: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
}
.bg-r img {
  width: 28px;
}
.bg-g img {
  width: 24px;
}
.logo-w-txt {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 35px 0 5px;
  letter-spacing: 2px;
}
.logo-g-txt {
  color: #fff;
  font-size: 12px;
  margin-bottom: 2px;
}

</style>
