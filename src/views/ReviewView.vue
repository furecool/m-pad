<template>
  <div class="review">
    <div class="wrapper">
      <div class="content">
        <div class="review__nav">
          <div class="review__nav__title">
            <p>視訊櫃台主管覆核管理</p>
          </div>
          <div class="review__nav__logout">
            <div class="review__nav__logout__time">
              今天是<p>2020</p>年<p>7</p>月<p>11</p>日(星期<p>一</p>)
            </div>
            <button class="review__nav__logout__btn">登出</button>
          </div>
        </div>
        <div class="review__content">
          <div class="review__content__sideBar">
            <div class="review__content__sideBar__user">
              <div class="sidebar__title">
                登入者: XX凱
              </div>
            </div>
            <div class="review__content__sideBar__func">
              <p>首頁</p>/
              <p>查詢</p>
            </div>
            <div class="review__content__sideBar__listBox">
              <div class="sidebar__title">身分待覆核清單</div>
              <ul class="sidebar__list">
                <li v-for="identity in $store.state.infoIdentity" :key="identity.id" class="sidebar__list__item" @click="setcurrentReview(identity, 'i')">
                  {{identity.reviewString}}
                </li>
              </ul>
            </div>
            <div class="review__content__sideBar__listBox">
              <div class="sidebar__title">交易待覆核清單</div>
              <ul class="sidebar__list">
                <li v-for="trade in $store.state.infoTrade" :key="trade.id" class="sidebar__list__item" @click="setcurrentReview(trade, 't')">
                  {{trade.reviewString}}
                </li>
              </ul>
            </div>
          </div>
          <div class="review__content__main">
            <div class="review__content__main__title">{{mainTitle}}</div>
            <div class="review__content__main__content">
              <div class="review__content__main__content__text">
                <div class="review__content__main__content__text__item">
                  <div class="main__label">辦理分行: <p>{{currentReview.branchName}}</p></div>
                  <div class="main__label">辦理業務: <p>{{currentReview.category}}</p></div>
                  <div class="main__label">辦理行員: <p>{{currentReview.clerkId}}</p></div>
                  <div class="main__label">視訊號碼: <p>{{currentReview.videoNumber}}</p></div>
                  <div class="main__label">交易備註: <p>{{currentReview.ps}}</p></div>
                </div>
                <div class="review__content__main__content__text__item">
                  <div class="text__item__title">客戶資料</div>
                  <div class="main__label">戶名: <p>{{currentReview.name}}</p></div>
                  <div class="main__label">帳號: <p>{{currentReview.account}}</p></div>
                  <div class="main__label">身分證號: <p>{{currentReview.idNumber}}</p></div>
                </div>
                <div class="review__content__main__content__text__item">
                  <div class="text__btn__answer">
                    <div class="text__btn__pass" @click="answer('pass')">通過</div>
                    <div class="text__btn__reject" @click="answer('reject')">退回</div>
                  </div>
                  <div class="text__btn__checkAnother" @click="checkAnother">調閱身分覆核頁面</div>
                </div>
              </div>
              <div class="review__content__main__content__photo">
                <div class="photo__client">
                  <div class="main__label">現場照片</div>
                  <div class="photo__client__pic">
                    <img :src="currentReview.clientPic">
                  </div>
                </div>
                <div class="photo__document">
                  <div class="main__label">交易覆核文件(正面)</div>
                  <div class="photo__document__pic">
                    <img :src="currentReview.documentPic">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      mainTitle: '',
      currentReview: {}
    }
  },
  activated() {
    this.setcurrentReview()
  },
  watch: {
    '$store.state.infoReview': function() {
      this.setcurrentReview()
    }
  },
  methods: {
    answer(answer) {
      if(this.mainTitle == '身分覆核作業') {
        this.$store.state.infoIdentity = this.$store.state.infoIdentity.filter((card) => card.reviewString !== this.currentReview.reviewString)
      } else if(this.mainTitle == '交易覆核作業') {
        this.$store.state.infoTrade = this.$store.state.infoTrade.filter((card) => card.reviewString !== this.currentReview.reviewString)
      }
      if(answer == 'pass') {
        alert(this.currentReview.reviewString + '通過')
      } else if(answer == 'reject') {
        alert(this.currentReview.reviewString + '退回')
      }
      this.currentReview = {}
    },
    checkAnother() {
      alert('調閱身分覆核')
    },
    setcurrentReview(reviewItem, title) {
      if(!this.currentReview.reviewString && this.$store.state.infoIdentity[0] && !reviewItem) {
        // console.log("bb !!")
        this.currentReview = this.$store.state.infoIdentity[0]
        this.mainTitle = '身分覆核作業'
      } else if(this.currentReview.reviewString || reviewItem) {
        // console.log("cc !!")
        this.currentReview = reviewItem
        if(title == 'i') {
          this.mainTitle = '身分覆核作業'
        } else if(title == 't') {
          this.mainTitle = '交易覆核作業'
        }
      }
      // console.log(this.currentReview.name)
    }
  },

}
</script>

<style>

  .review .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .review .content {
    width: 90%;
    background: #fff;
  }
  .review .content img{
    width: 100%;
  }
  /* -------------- review__nav -------------- */
  .review__nav {
    background-color: #8b8b8b;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .review__nav__title {
    color: #fff;
    font-size: 18px;
  }
  .review__nav__logout {
    display: flex;
  }
  .review__nav__logout__time {
    display: flex;
    align-items: center;
    margin: 0 10px;
    font-size: 14px;
    line-height: 14px;
  }
  .review__nav__logout__btn {
    font-size: 10px;
    line-height: 14px;
    height: 24px;
    width: 40px;
    color: blue;
  }
  /* -------------- review__content -------------- */
  .review__content {
    background-color: #ffffff;
    height: 550px;
    display: flex;
    overflow: scroll;
  }
  /* -------------- review__content__sideBar -------------- */
  .review__content__sideBar {
    min-width: 120px;
    width: 20%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .review__content__sideBar__user {
    border-bottom: 2px solid rgb(221, 221, 221);
    margin: 0 auto 10px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align:left;
  }
  .review__content__sideBar__func {
    display: flex;
    color: #3d97eb;
    font-weight: 400;
  }
  .review__content__sideBar__listBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .sidebar__title {
    color: rgb(6, 58, 100);
    font-weight: 400;
  }
  .sidebar__list {
    list-style: none;
  }
  .sidebar__list__item {
    margin: 10px 0;
    margin-left: 25px;
    color: #3d97eb;
    line-height: 20px;
    font-size: 14px;
    text-align:left;
    position: relative;
  }
  .sidebar__list__item::before{
    content: "\2022";
    color: rgb(0, 0, 0);
    font-weight: 400;
    position: absolute;
    left: -10px;
  }
  /* -------------- review__content__main -------------- */
  .review__content__main {
    flex: 1;
    padding: 20px 10px;
  }
  .review__content__main__title {
    color: rgb(6, 58, 100);
    font-weight: 400;
    font-size: 26px;
    text-align:left;
  }
  .review__content__main__content {
    margin-top: 25px;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  /* -------------- review__content__main__content__text -------------- */
  .review__content__main__content__text {
    width: 20%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .review__content__main__content__text__item {
    margin-bottom: 30px;
    width: 100%;
  }
  .text__item__title {
    color: #3d97eb;
    font-weight: 400;
    text-align:left;
  }
  .main__label {
    color: rgb(6, 58, 100);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
  }
  .main__label p {
    margin-left: 10px;
  }
  .text__btn__answer {
    display: flex;
    margin-bottom: 20px;
  }
  .text__btn__pass {
    width: 40px;
    background-color: #005ca8;
    color: rgb(255, 255, 255);
    font-size: 14px;
    padding: 7px 3px;
    margin: 0 15px 10px;
    border-radius: 7px;
  }
  .text__btn__reject {
    width: 40px;
    background-color: #a80000;
    color: rgb(255, 255, 255);
    font-size: 14px;
    padding: 7px 3px;
    margin: 0 15px 10px;
    border-radius: 7px;
  }
  .text__btn__checkAnother {
    width: 60px;
    background-color: #d6ebde;
    color: rgb(6, 58, 100);
    font-weight: 400;
    font-size: 14px;
    padding: 3px;
  }
  /* -------------- review__content__main__content__photo -------------- */
  .review__content__main__content__photo {
    width: 55%;
    min-width: 200px;
  }
  .photo__document__pic {
    width: 200px;
  }

</style>
