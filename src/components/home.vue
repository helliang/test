<template>
    <div id="home">
      <div class="home_header">
        <div class="home_left">
          <img src="../assets/images/icon_tz.png" alt="">
          <span>汤钻 <span>{{diamond}}</span></span>
        </div>
        <div class="home_right">
          <img src="../assets/images/icon_jlz.png" alt="">
          <span>健康力 <span>{{power}}</span></span>
        </div>
      </div>
      <v-scroll :scrollList="scrollList" @my-scroll="scroll"></v-scroll>
      <div class="home_zb">
        <div class="home_posi" v-bind:class="{zome:index==current}" v-for="(item,index) in amounum" :key="index" :style="{top:item.top +'px',left:item.left +'px'}" @click="amounme(index,$event)">
          <div class="home_bodshow">
            <img src="../assets/images/icon_tz.png" alt="">
          </div>
          <span>{{item.amount}}</span>
        </div>
      </div>
      <div class="home_footer clearfix">
        <div class="home_le">
          <span>查看区块</span>
          <img src="../assets/images/icon_qkzc.png" alt="">
          <p>区块高度及资产</p>
        </div>
        <div class="home_le">
          <span>使用帮助</span>
          <img src="../assets/images/icon_sc.png" alt="">
          <p>添加搜藏领汤钻</p>
        </div>
      </div>
    </div>
  </template>
  <script>
  import scroll from "../common/scroll";
  export default {
    name: "home",
    components:{
      'v-scroll':scroll
    },
    data() {
      return {
        // 公告栏数据
        scrollList: [
          "钱包正式上线，活动火热进行中!",
          "测试公告，测试公告，测试公告",
          "测试公告，测试公告，测试公告，测试公告，测试公告，测试公告"
        ],
        // 拆分位置
        zsarr:[],
        // 钻石总数
        amount:'0',
        // 健康力数量
        power:'0',
        // 拥有钻石数量
        diamond:'0',
        // 钻石总数拆分
        amountarr:[],
        // 钻石的位置、数量
        amounum:[],
        current: -1
      };
    },
    methods: {
      // 公告栏
      scroll(key){
        console.log(key)
      },
      // 获取随机不重叠坐标
      createBubble(num) {
        //值越大，元素左右间隔越大
        let iconWidth = 60;
        //值越大，元素上下间隔越大
        let iconHeight = 60;
        let targetHeight = document.querySelector(".home_zb").offsetHeight;
        let targetWidth = document.querySelector(".home_zb").offsetWidth;
        let _tmpArray = [];
        //当放置的元素的宽高大于浏览器窗口的宽高时，直接返回
        if (targetWidth < iconWidth || targetHeight < iconHeight) {
          return false;
        }
          //用浏览器的宽度除以一个元素的宽度可算出浏览器窗口内一行可以放置元素的个数
        let xNum = parseInt(targetWidth / iconWidth, 10);
          //用浏览器的高度除以一个元素的高度可算出浏览器窗口内一列可以放置元素的个数
        let yNum = parseInt(targetHeight / iconHeight, 10);
          //浏览器窗口内总共可以放置元素的个数
        let allNum = xNum * yNum;
        //当需要放置的元素的个数超过浏览器窗口内总共可以放置的元素的个数时，则返回
        if (num >= allNum) {
          return false;
        }
        for (let i = 0; i < allNum; i++) {
          _tmpArray.push(i);
        }
        let xStart = 0,
          yStart = 0;
        while (num) {
          let pointer = Math.floor(Math.random() * allNum); //向下取整取出0到allnum之间的任意一个整数
          //如果数组_tmpArray中不存在第pointer值，则继续
          if (!_tmpArray[pointer]) {
            continue;
          }
          delete _tmpArray[pointer]; //删除数组_tmpArray中第pointer个值
          // yStart = parseInt(pointer / xNum) * iconWidth;
          yStart = pointer/xNum*iconWidth+ Math.random() * 10;
          xStart = (pointer % xNum) * iconHeight + Math.random() * 40;
          // 得到钻石数量数组
          this.zsarr.push({
            yStart:yStart,
            xStart:xStart
          });
          num--;
        }
        let amounum = [];
        for(var i = 0;i<this.zsarr.length;i++){
          amounum.push({
            top:this.zsarr[i].yStart,
            left:this.zsarr[i].xStart,
            amount:this.amountarr[i]
          })
        }
        this.amounum = amounum;
        var amounumString=JSON.stringify(amounum);
        localStorage.setItem("locale", amounumString);
        // 钻石数量缓存
        localStorage.setItem("zsnum", this.diamond);
      },
      /*
      * num    钻石总数amount
      * cishu  最多分几份
      */
      diamonted(num,cishu){
        let sum = num;
        let monery;
        for(let i=0;i<cishu;i++){
          if(i===(cishu-1)){
            monery = sum.toFixed(4);
          }else{
            monery = (Math.random()*sum).toFixed(4);
          }
          if(monery < 0.0001){
            monery = "0.0001";
          }
          sum = sum - monery;
          this.amountarr.push(monery)
        }
      },
      // 点击删除钻石增加
      amounme(e,i){
        var namenum = 0;
        namenum = parseFloat(this.diamond) + parseFloat(this.amounum[e].amount);
        this.diamond = parseFloat(namenum).toFixed(4);
        // 钻石数量缓存
        localStorage.setItem("zsnum", this.diamond);
        this.current = e;
        let self = this;
        setTimeout(function(){ 
          self.amounum.splice(e,1);
          self.current = -1;
          var amounumString=JSON.stringify(self.amounum);
         localStorage.setItem("locale", amounumString);
        }, 500);
      }
    },
    mounted() {
      // localStorage.removeItem("state");　
      // 判断缓存状态 这里默认不给  得到数据给判断值
      var getLocalData = localStorage.getItem("state");
      console.log(getLocalData)
      if(getLocalData == null){
        // 获取本地接送数据
        let self = this;
        this.$http.get(this.apis.userinfo).then(function(res) {
          if(res.data.errorCode == '00'){
            let data = res.data.returnObject;
            self.amount = data.amount;
            self.power = data.userInfo.power;
            self.diamond = data.userInfo.diamond;
            // 钻石数量缓存
            localStorage.setItem("zsnum", self.diamond);
            // 健康值
            localStorage.setItem("jknum", self.power);
            // 昵称
            localStorage.setItem("ncnu", data.userInfo.nickName);
            self.diamonted(data.amount,10);
            self.createBubble(10);
            localStorage.setItem("stater", 2);
          }else{
            alert('请求失败')
          }
        })
        .catch(function (error) {
          alert('请求失败1')
        });
      }
      if(localStorage.getItem("stater") == 2){
        localStorage.setItem("state", 1);
        var getLocalData = localStorage.getItem("locale");
        var jsonarr = JSON.parse(getLocalData);
        this.diamond = localStorage.getItem("zsnum");
        this.power = localStorage.getItem("jknum");
        this.amounum = jsonarr;
        console.log(jsonarr)
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  #home {
    margin-bottom: 1.333333rem;
    height: 100vh;
    margin: 0 auto;
    background-image: url('../assets/images/icon_testbj.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: auto;
  }
  .home_header{
    margin-top: .266667rem;
    margin-left: 3%;
    margin-bottom: .373333rem;
    width: 76%;
    padding: 0 .24rem;
    border-radius: 1.333333rem;
    line-height: .826667rem;
    height: .826667rem;
    background-color: #12205e;
    display: flex;
    align-items: center;
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
        margin-right: .32rem;
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
      }
      span{
        font-size: .373333rem;
        color: #fff;
      }
    }
  }
  .home_zb {
    height: 8rem;
    position: relative;
    .home_posi{
      position: absolute;
      .home_bodshow{
        width: .933333rem;
        height: .933333rem;
        margin: 0 auto;
        background-color: #040f42;
        border-radius: 50%;
        display: flex;
        align-items: center;
        animation: heart 1.3s ease-in-out 0s infinite alternate;
        box-shadow: 0px 0px .4rem #1f3ead inset;
        img{
          display: block;
          width: .453333rem;
          height: .533333rem;
          margin:0 auto;
        }
      }
      span{
        color: #fff;
        font-size: .373333rem;
        text-align: center;
      }
    }
  }
@keyframes heart{
  from{margin-top:0px;}
  to{margin-top:-6px;}
}
@keyframes heart{
  from{transform:translate(0,0)}
  to{transform:translate(0,6px)}
}

@-webkit-keyframes zoomOut {
  0% {
    opacity: 1
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  100% {
    opacity: 0
  }
}

@keyframes zoomOut {
  0% {
    opacity: 1
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3)
  }

  100% {
    opacity: 0
  }
}

.zoomOut {
  -webkit-animation-name: zoomOut;
  animation-name: zoomOut
}
.home_footer{
  padding: 0 3%;
  position: fixed;
  bottom: 1.506667rem;
  .home_le {
    background-color: #061454;
    width: 3.606667rem;
    text-align: center; 
    border-radius: .2rem;
    padding: .1rem 0;
    margin-right:.2rem;
    float: left;
    box-shadow: 4px 4px 10px #030d3d;
    span{
      line-height: .933333rem;
      color: #4165b9;
      font-size: .4rem;
    }
    img{
      display: block;
      width: 1.386667rem;
      height: 1.386667rem;
      margin: 0 auto;
    }
    p{
      color: #fff;
      font-size: .4rem;
      line-height: 1.066667rem;
    }
  }
}
.zome{
  position: absolute;
 -webkit-animation: zoomOut .4s ease .1s 1 both;
 -webkit-background-clip: content;
}
</style>
  
  