<template>
  <div class="take">

    <div class="wrapper">

      <div class="content">
        <img src="../../public/take-ref.jpg" alt="">
      </div>

    </div>

    

  </div>
</template>

<script>

export default {

  name: 'TakeView',
  components: {
  },
  data() {
    return {
      getTime: 500,
      info: []
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
        vm.info = res.data.inline

      })
      .catch(function(err) {
        console.log(err)
      })
    }
    clearInterval(setInterval(getInfo, this.getTime))
    getInfo()
    setInterval(getInfo, this.getTime)
  },
  methods: {
  },

}
</script>

<style>

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .take .content {
    width: 90%;
    background: #fff;
  }
  .take .content img{
    margin: 30px auto;
    width: 100%;
  }

</style>
