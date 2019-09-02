const BASEURL = 'https://www.easy-mock.com/mock/5d64c4d6c5e41c7cf8438a0c/SmileVue/';
const LOCALURL = 'http://localhost:3000/'
const URL = {
        getShoppingMallInfo : BASEURL + 'index',//商城首页所有信息
        getGoodsInfo: BASEURL + 'getGoodsInfo',
        registerUser: LOCALURL + 'user/register',//用户注册接口
        loginUser: LOCALURL + 'user/login',//用户登录接口
        getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',//获取商品详情接口
        getCategoryList: LOCALURL + 'goods/getCategoryList',//得到商品大类信息
        getCategorySubList: LOCALURL + 'goods/getCategorySubList',//得到大类下面的小类信息
        getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID',//得到小类商品的信息
}
module.exports = URL;