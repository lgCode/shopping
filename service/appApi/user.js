const Router = require("koa-router");
const mongoose = require('mongoose');


let router = new Router();
/* /user  下的页面 */
router.get('/', async (ctx) => {
  ctx.body = "这是用户操作首页"
});

/* /user/register 下的页面 */
router.post('/register', async (ctx) => {

  const User = mongoose.model('User'); //使用User模型
  let newUser = new User(ctx.request.body);

  await newUser.save().then(() => {
      ctx.body = {
        code: 200, //等同于成功
        message: '注册成功'
      }
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      }
    });
});
//登录
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body;
  console.log(loginUser);
  let userName = loginUser.userName;
  let password = loginUser.password;

  //引入User中的Model
  const User = mongoose.model('User');

  //异步等待查找数据库,查找用户名是否存在，如果存在开始比对密码
  await User.findOne({userName: userName}).exec().then(async(result) => {
      console.log(result);
      if (result) {
        let newUser = new User();//因为是实例方法，所以要new出对象，才能调用
        //密码比对
        await newUser.comparePassword(password, result.password)
          .then(isMatch => {
            //返回比对结果
            ctx.body = {
              code: 200,
              message: isMatch
            };
          })
          .catch(err => {
            //出现异常，返回异常
            ctx.body = {
              code:500,
              message:err
            }
          });
      } else {
        ctx.body = {
          code: 200,
          message: '用户名不存在'
        };
      }
      
    }).catch(err => {
      ctx.body = {
        code: 500,
        message: err
      }
    })
})


module.exports = router;
