const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const categorySchema = new Scheme({
    ID:{unique:true,type:String},
    MALL_CATEGORY_NAME:{type:String}, 
    IMAGE:{type:String},
    TYPE:{type:Number},
    SORT:{type:Number},
    COMMENTS:{type:String},
});
//模型化
mongoose.model('Category',categorySchema);