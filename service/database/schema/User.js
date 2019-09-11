const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const bcrypt = require("bcrypt"); //加密算法
const SALT_WORK_FACTOR = 10; //加盐个数

//创建UserSchema,类似表的字段格式模型
const userSchema = new Schema({
  UserId: {
    type: ObjectId
  },
  userName: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  creatAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'user' //自定义数据库表名
});
//加盐加密
userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {

    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });

  });
});

//验证密码
userSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      })
    })
  }
}


//发布模型
mongoose.model('User', userSchema);
