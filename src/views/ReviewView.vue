<template>
  <div class="review">

    <div class="wrapper">

      <div class="content">
        <img src="../../public/reviewTrade.png" alt="">
      </div>

    </div>

    

  </div>
</template>

<script>

export default {

  name: 'ReviewView',
  components: {
  },
  data() {
    return {
      getTime: 500,
    }
  },
  created() {
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

  .review .content {
    width: 90%;
    background: #fff;
  }
  .review .content img{
    margin: 40px auto;
    width: 80%;
  }

</style>
