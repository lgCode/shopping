<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li v-for="(item, index) in categoryList" :key="index" @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex === index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item, index) in categorySubList" :key="index" :title="item.MALL_SUB_NAME">

              </van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
                    <div class="list-item-img">
                        <img :src="item.IMAGE1" :onerror="errorImg" width="100%" height="100%" alt="" />

                    </div>
                    <div class="list-item-text">
                            <div> {{item.NAME}} </div>
                            <div> ￥{{item.ORI_PRICE | moneyFilter}}元 </div>
                    </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import url from '@/serviceAPI.config.js';
  import {
    Toast
  } from 'vant';
 import {
    toMoney
  } from '@/filter/moneyFilter.js';
  export default {
    data() {
      return {
        categoryList: [], //大类别列表
        categoryIndex: 0, //点击索引
        categorySubList: [], //小类列表
        active: 0, //激活标签的值
        loading: false, //上拉加载时的状态
        finished: false, //上拉加载是否有数据
        list: [], //商品数据
        isRefresh: false, //下拉刷新
        page: 1, //商品列表的页数
        goodList: [], //商品列表信息
        categorySubId: '', //商品子类ID
        errorImg:'this.src="' + require('@/assets/images/1.jpg')+'"',//错误图片拼接
      }
    },
    methods: {
      //获取大类
      getCategory() {
        axios({
            url: url.getCategoryList,
            method: 'get'
          })
          .then(res => {
            //   console.log(res);
            if (res.data.code === 200 && res.data.message) {
              this.categoryList = res.data.message;
              // console.log(this.categoryList);
              this.getCategorySubByCategoryID(this.categoryList[0].ID);
            } else {
              Toast('服务器错误，获取数据异常')
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      //点击大类
      clickCategory(index, categoryId) {
        this.categoryIndex = index;
        this.page = 1;
        this.finished = false;
        this.goodList = [];
        this.getCategorySubByCategoryID(categoryId);
      },
      //根据大类ID读取小类类别列表  
      getCategorySubByCategoryID(categoryId) {
        axios({
            url: url.getCategorySubList,
            method: 'post',
            data: {
              categoryId: categoryId
            }
          })
          .then(res => {
            if (res.data.code === 200 && res.data.message) {
              this.categorySubList = res.data.message;
              this.active = 0;
              this.categorySubId = this.categorySubList[0].ID;
              this.onLoad();
            }
            //   console.log(this.categorySubList);
          })
          .catch(err => {
            console.log(err);
          })
      },
      //上拉加载
      onLoad() {
        setTimeout(() => {
          this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySubList[0].ID;
          this.getGoodList();
        }, 1000)
      },
      //下拉刷新
      onRefresh() {
        setTimeout(() => {
          this.isRefresh = false;
          this.finished = false;
          this.goodList = [];
          this.page = 1;
          this.onLoad();
        }, 1000);
      },
      //点击子类
      onClickCategorySub(index,title) {
        this.categorySubId = this.categorySubList[index].ID;
        // console.log(`categorySubId:${this.categorySubId}`);
        this.goodList = [];
        this.finished = false;
        this.page = 1;
        this.onLoad();
      },
      //获取商品数据
      getGoodList() {
        axios({
            url: url.getGoodsListByCategorySubID,
            method: 'post',
            data: {
              categorySubId: this.categorySubId,
              page: this.page
            }
          })
          .then(res => {
            // console.log(res);
            if (res.data.code === 200 && res.data.message.length) {
              this.page++;
              this.goodList = this.goodList.concat(res.data.message);
            } else {
              this.finished = true; //代表没有数据了
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
          })
      },
      //调整到商品详细页
      goGoodsInfo(id){
          this.$router.push({name:'Goods',params:{goodsId:id}});
          //path - query 
          //name - params
      }
    },
    created() {
      this.getCategory();
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight;
      document.getElementById('leftNav').style.height = winHeight - 46 + 'px';
      document.getElementById('list-div').style.height = winHeight - 90 + 'px';
    },
    filters: {
      moneyFilter(money) {
        return toMoney(money);
      }
    }
  }

</script>

<style scoped>
  #leftNav {
    background-color: aliceblue;
  }

  #leftNav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #E4E7ED;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
  }

  .categoryActive {
    background-color: #fff;
  }


  .list-item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
  }

  /* .list-item {
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  } */

  #list-div {
    overflow: scroll;
  }

  .list-item-img {
    flex: 8;
  }

  .list-item-text {
    flex: 16;
    margin-top: 10px;
    margin-left: 10px;
  }

</style>
