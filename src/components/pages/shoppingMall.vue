<template>
  <div>
    <!-- 搜索条 -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="icon-location" alt="">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播 -->
    <div class="swiper-area" v-cloak>
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" alt="轮播图">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 类别bar -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" alt="">
        <span> {{cate.mallCategoryName}} </span>
      </div>
    </div>
    <!-- 广告牌区域 -->
    <div>
      <img v-lazy="adBanner" width="100%" alt="">
    </div>
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" alt="推荐图片">
              <div> {{item.goodsName}} </div>
              <div> ￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- 推荐商品图片楼层 -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

    <!-- 热卖 -->
    <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
          <!--这里需要一个list组件-->
          <van-list>
            <van-row gutter="20">
              <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
              </van-col>
            </van-row>
          </van-list>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import 'swiper/dist/css/swiper.css';
  import { swiper,swiperSlide } from 'vue-awesome-swiper';

  import floorComponent from '../component/floorComponent';
  import goodsInfo from '../component/goodsInfoComponent';
  import { toMoney } from '@/filter/moneyFilter.js'
  import url from '@/serviceAPI.config.js'

  export default {
    data() {
      return {
        locationIcon: require('../../assets/images/location.png'),
        bannerPicArray: [], //swipe图片
        category: [], //导航商品列表
        adBanner: '', //广告条
        recommendGoods: [], //推荐商品轮播
        swiperOption: {
          slidesPerView: 3
        }, //推荐商品轮播配置
        floor1: [],
        floor2: [],
        floor3: [],
        floorName:{},
        hotGoods:[],  //热卖商品
      }
    },
    components: {
      swiper,
      swiperSlide,
      floorComponent,
      goodsInfo,
    },
    created() {
      axios({
          url:url.getShoppingMallInfo,
          method: 'get'
        })
        .then(res => {
          // console.log(res.data);
          if (res.status == 200) {
            this.category = res.data.data.category;
            this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
            this.bannerPicArray = res.data.data.slides;
            this.recommendGoods = res.data.data.recommend;
            this.floor1 = res.data.data.floor1;
            this.floor2 = res.data.data.floor2;
            this.floor3 = res.data.data.floor3;
            this.floorName = res.data.data.floorName;
            this.hotGoods = res.data.data.hotGoods;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    methods: {},
    filters:{
      moneyFilter(money){
        return toMoney(money);
      }
    },
  }

</script>

<style scoped>
  [v-cloak] {
    display: none;
  }

  .search-bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }

  .icon-location {
    height: 2.2rem;
  }

  .search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }

  .location-icon {
    padding-top: .2rem;
    padding-left: .3rem;
  }

  .swiper-area {
    clear: both;
    max-height: 10rem;
    overflow: hidden;
  }

  .type-bar {
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .type-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
    flex: 1;
  }

  .recommend-area {
    background-color: #fff;
    margin-top: .3rem;
  }

  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
  }

  .recommend-body {
    border-bottom: 1px solid #eee;
  }

  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }

  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }

  .hot-goods {
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
  }
   
</style>
