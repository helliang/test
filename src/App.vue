<template>
  <div id="app">
    <div class="header" v-if="isShowHeader" id="headers">
      <span v-if="isShowback" class="back" @click="backForward"></span>
      <span class="title-info">{{ headerTitle }}</span>
    </div>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <ul class="footer" v-if="isShowFooter">
      <li>
        <router-link to="/home" class="tabbar__icon tabbar_home tabbar_home1">首页</router-link>
      </li>
      <li>
        <router-link to="/category" class="tabbar__business tabbar__icon tabbar__business1">发现</router-link>
      </li>
      <li>
        <router-link to="/notification" class="tabbar__setting tabbar__icon tabbar__setting1">任务</router-link>
      </li>
      <li>
        <router-link to="/account" class="tabbar__cart tabbar__icon tabbar__cart1">我的</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "App",
    data() {
      return {
        transitionName: "" //初始过渡动画方向
      };
    },
    methods: {
      backForward() {
        if (
          this.$route.path == "/home" ||
          this.$route.path == "/category" ||
          this.$route.path == "/notification" ||
          this.$route.path == "/account"
        ) {
          console.log(1);
        } else {
          this.$router.go(-1);
        }
      },
      record() {
        this.$router.replace({ name: "record" });
      }
    },
    mounted() {},
    computed: {
      // 存储到store状态管理中
      ...mapState({
        isShowback: state => state.$vux.btnStatus,
        headerTitle: state => state.$vux.headerTitle,
        isShowFooter: state => state.$vux.isShowFooter,
        isShowHeader: state => state.$vux.isShowHeader
      })
    },
    watch: {
      $route(to, from) {
        let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
        if (isBack == 2) {
          this.transitionName = "slide-left";
        } else if (isBack == 1) {
          this.transitionName = "";
        } else {
          this.transitionName = "slide-right";
        }
        this.$router.isBack = 2;
      }
    }
  };
</script>

<style>
  body,
  html {
    overflow: visible !important;
    height: auto !important;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
  }
  .Router {
    position: absolute;
    height: 100%;
    transition: all 0.377s ease;
    will-change: transform;
    top: 0;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .weui-toast_content {
    line-height: 0.170588rem !important;
  }
  .weui-icon_toast.weui-loading {
    margin: 0.452941rem 0 0;
    width: 38px;
    height: 38px;
    vertical-align: baseline;
  }
  .weui-icon_toast {
    font-size: 1.10588rem !important;
    margin-top: 0.470588rem;
  }
  .header {
    height: 1.066667rem;
    width: 100%;
    background-color: #12205e;
    color: #fff;
    font-size: 0.453333rem;
    text-align: center;
    line-height: 1.066667rem;
    position: fixed;
    top: 0;
    z-index: 100;
  }
  .title-info {
    display: inline-block;
    width: 70%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .footer {
    height: 1.306667rem;
    width: 100%;
    background-color: #01092e;
    position: fixed;
    bottom: 0;
    margin: 0;
    padding: 0;
  }
  .footer li {
    width: 25%;
    float: left;
    text-align: center;
  }

  .footer li {
    flex: 1;
    height: 1.333333rem;
    text-align: center;
    display: flex;
  }
  .footer li a {
    width: 100%;
    height: 1.333333rem;
    display: block;
    line-height: 2rem;
    font-size: 0.293333rem;
    color: #fff;
    align-items: center;
  }
  .tabbar_home {
    background: url("assets/images/home.png") no-repeat;
    background-size: 0.626667rem 0.533333rem;
  }
  .tabbar__business {
    background: url("assets/images/cate.png") no-repeat;
    background-size: 0.613333rem 0.533333rem;
  }
  .tabbar__setting {
    background: url("assets/images/note.png") no-repeat;
    background-size: 0.546667rem 0.533333rem;
  }
  .tabbar__cart {
    background: url("assets/images/account.png") no-repeat;
    background-size: 0.613333rem 0.533333rem;
  }
  .tabbar__icon {
    margin: 0 auto;
    background-position: 50% 21%;
  }

  .footer li a.on {
    color: #fff;
  }
  .router-link-exact-active.tabbar_home1 {
    background: url("assets/images/home1.png") no-repeat;
    background-position: 50% 21%;
    background-size: 0.626667rem 0.533333rem;
  }
  .router-link-exact-active.tabbar__business1 {
    background: url("assets/images/cate1.png") no-repeat;
    background-position: 50% 21%;
    background-size: 0.613333rem 0.533333rem;
  }
  .router-link-exact-active.tabbar__setting1 {
    background: url("assets/images/note1.png") no-repeat;
    background-position: 50% 21%;
    background-size: 0.546667rem 0.533333rem;
  }
  .router-link-exact-active.tabbar__cart1 {
    background: url("assets/images/account1.png") no-repeat;
    background-position: 50% 21%;
    background-size: 0.613333rem 0.533333rem;
  }
  .back {
    display: inline-block;
    width: 0.266667rem;
    height: 0.506667rem;
    background: url("assets/images/icon-fh@2x.png") no-repeat;
    background-size: 100%;
    position: absolute;
    left: 0.293333rem;
    top: 0.293333rem;

    z-index: 11;
  }
  .record {
    position: absolute;
    right: 0.4rem;
    color: rgb(235, 235, 235);
  }
</style>
