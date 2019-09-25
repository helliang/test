<template>
  <div>
    <div class="scroll">
      <img src="../assets/images/icon_lb.png" alt="">
      <div class="scroll_box">
        <ul class="scroll_list" :class="{scroll_top:animate}">
          <li v-for="(item, index) in scrollList" @click="scroll(index)" :key="index" :id="index">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <span class="scroll_grnd">更多 ></span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "scroll",
    props: ["scrollList"],
    data() {
      return {
        animate: false
      };
    },
    created: function() {
      setInterval(this.showMarquee, 2000);
    },
    methods: {
      scroll(key) {
        this.$emit("my-scroll", key);
      },
      showMarquee: function() {
        this.animate = true;
        setTimeout(() => {
          this.scrollList.push(this.scrollList[0]);
          this.scrollList.shift();
          this.animate = false;
        }, 500);
      }
    }
  };
</script>

<style scoped>
  .scroll {
    width: 94%;
    margin: 0 3%;
    border-radius: 1.333333rem;
    display: flex;
    height: .826667rem;
    align-items: center;
    color: #fff ;
    background-color: #12205e;
    box-sizing: border-box;
  }
  .scroll img{
    display:block;
    width: .443333rem;
    height: .4rem;
    margin-left: .24rem;
  }
  .scroll_box {
    display: block;
    position: relative;
    width: 60%;
    height: .533333rem;
    overflow: hidden;
  }
  .scroll_list {
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  .scroll_top {
    transition: all 0.5s;
    margin-top: -.533333rem;
  }
  .scroll_list li {
    width: 100%;
    height: .533333rem;
    line-height: .533333rem;
    font-size: .373333rem;
    padding-left: .24rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .scroll_list li span {
    padding: 0 2px;
  }
  .scroll_grnd{
    color: #4165b9;
    font-size: .373333rem;
    margin-left: 18%;
  }
</style>
