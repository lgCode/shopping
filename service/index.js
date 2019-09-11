const Koa = require('koa');
const app = new Koa();
const {
  connect,
  initSchemas
} = require('./database/init.js');
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser'); //post请求数据转成对象
const cors = require("koa2-cors"); //cors跨域
const Router = require('koa-router');

app.use(bodyParser());
app.use(cors());


//引入路由
let user = require("./appApi/user.js");
let home = require("./appApi/home.js");
let goods = require("./appApi/goods.js");

//装载所有子路由
let router = new Router();
router.use('/user', user.routes());
router.use('/home', home.routes());
router.use('/goods', goods.routes());

//加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());


(async () => {
  await connect();
  initSchemas(); //初始化模型

  /*  const User = mongoose.model("User");
   let oneUser = new User({userName:'Bruce1G012',password:'123456'});

   oneUser.save().then(()=>{
           console.log('插入成功');
   });
   let users = await User.findOne({}).exec();
   console.log('-----------------------------------------');
   console.log(users);
   console.log('-----------------------------------------'); */
})();


app.use(async (ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
});

app.listen(3000, () => {
  console.log('[Service] starting at port 3000');
});
