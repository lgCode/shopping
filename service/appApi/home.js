const Router = require("koa-router");
let router = new Router();
/* /home 下页面 */
router.get('/',async(ctx) => {
    ctx.body = "首页接口"
});

module.exports = router;