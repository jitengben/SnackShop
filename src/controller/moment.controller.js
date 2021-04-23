const fs = require('fs')

const momentService = require("../service/moment.service")
const fileService = require('../service/file.service')
const {MOMENT_PATH} = require('../constants/file-path')
class MomentController {
  async create(ctx, next) {
    //获取上传信息的用户id
    const {id} = ctx.user;
    //获取用户请求传递的参数
    const moment = ctx.request.body;
    //新增评论
    const result =  await momentService.createMoment(moment,id);
     
    //返回数据
    ctx.body = result.insertId;
  }
  //通过商品id获取评论
  async momentInfo(ctx, next) {
    try {
      //获取商品ID
      const { productId } = ctx.params;
      //获取评论
      const result = await momentService.getMomentByProductId(productId);
      
      //返回数据
      ctx.body = result;
      } catch (error) {
      console.log(error)
    }
  }
  async fileInfo(ctx, next){
    try {
      let {filename} = ctx.params;
      const fileInfo = await fileService.getMomentPictureByFilename(filename);
      const { type } = ctx.query;
      const types = ["small", "middle", "large"];
      if (types.some(item => item === type)) {
        filename = filename + '-' + type;
      }
      ctx.response.set('content-type', fileInfo.mimetype);
      ctx.body = fs.createReadStream(`${MOMENT_PATH}/${filename}`);
    } catch (error) {
      console.log(error)
    }
  }
 
}

module.exports = new MomentController();