<template>
  <div id="account">
    <div class="account_header">
      <span class="nc">{{nc}}</span>
      <div class="account_top">
        <div class="home_left">
          <img src="../assets/images/icon_tz.png" alt="">
          <span>汤钻 <span>{{diamond}}</span></span>
        </div>
        <div class="home_right">
          <img src="../assets/images/icon_jlz.png" alt="">
          <span>健康力 <span>{{power}}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      diamond:0,
      power:0,
      nc:''
    };
  },
  methods: {
  
  },
  mounted() {
    this.diamond = localStorage.getItem("zsnum");
    this.power = localStorage.getItem("jknum");
    this.nc = localStorage.getItem("ncnu");
    console.log()
  }
};
</script>



<style lang="less" scoped>
.account_header{
  margin-top: 1.066667rem;
  text-align: center;
  height: 5rem;
  background-color: #040f42;
  .nc{
    display: block;
    color: #fff;
    font-size: .46rem;
    padding: 2rem 0 .4rem 0;
  }
  .account_top{
    display: flex;
    align-items: center;
    justify-content: center;
    .home_left{
        display: flex;
        align-items: center;
        img{
          display: block;
          width: .346667rem;
          height: .426667rem;
          margin-right: .133333rem;
        }
        span{
          font-size: .373333rem;
          color: #fff;
        }
      }
      .home_right{
        display: flex;
        align-items: center;
        img{
          margin-right: .133333rem;
          display: block;
          width: .426667rem;
          height: .426667rem;
          margin-left:.2rem;
        }
        span{
          font-size: .373333rem;
          color: #fff;
        }
      }
  }
}
</style>

