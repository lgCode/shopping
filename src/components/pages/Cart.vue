<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div class="cart-title">
        <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
        <div class="item-row" v-for="(item, index) in cartInfo" :key="index">
            <div class="item-img">
                <img :src="item.image" width="100%" alt="">
            </div>
            <div class="item-text"> 
                <div class="item-goods-name"> {{item.name}} </div>
                <div class="item-control"> 
                    <van-stepper v-model="item.count"></van-stepper>
                </div>
            </div>
            <div class="item-goods-price">
                <div>
                    ￥{{item.price | moneyFilter}}
                </div>
                <div>
                    x{{item.count}}
                </div>
                <div class="allPrice">
                    ￥{{item.price * item.count | moneyFilter}}
                </div>
            </div>
        </div>
    </div>
    <!-- 显示总金额 -->
    <div class="totalMoney">
        商品总价：￥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
  export default {
    data() {
      return {
        cartInfo: [], //购物车信息
        isEmpty: false, //购物车是否为空
      }
    },
    created(){
        this.getCartInfo();
    },
    methods: {
      //得到购物车信息
      getCartInfo() {
           //判断localStorage里是否有购物车数据
        if (localStorage.cartInfo) {
          this.cartInfo = JSON.parse(localStorage.cartInfo);
        }
        // console.log(' this.cartInfo:'+ JSON.stringify(this.cartInfo));
        
        this.isEmpty = this.cartInfo.length > 0 ? true : false;
      },
      //清空购物车
      clearCart(){
          localStorage.removeItem('cartInfo');
          this.cartInfo = [];
      }
    },
    filters:{
        moneyFilter(money){
            return toMoney(money);
        }
    },
    computed:{
        totalMoney(){
            let allMoney = 0;
            this.cartInfo.forEach(item => {
                allMoney += item.price * item.count;
            });
            localStorage.cartInfo = JSON.stringify(this.cartInfo);//更新缓存
            return allMoney;
        }
    }
  }

</script>

<style scoped>
.cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align:right;
}

.cart-list{
    background-color: #fff;
}
.item-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}

.item-img{
    flex:6;
}
.item-text{
    flex:14;
    padding-left:10px;
}
.item-control{
    padding-top:10px;
}
.item-goods-price{
    flex:4;
    text-align: right;
}
.allPrice{
    color:red;
}
.totalMoeny{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
}
</style>
