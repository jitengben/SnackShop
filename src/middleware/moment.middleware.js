const errorTypes = require('../constants/error-types')
const verifyMoment = async (ctx,next) => {
  //1.获取商品相关信息
  const { 
    content
  } = ctx.request.body;
  //2.判断商品信息不能为空
  if(!content){
    const error = new Error(errorTypes.CONTENT_IS_REQUIRED)
    return ctx.app.emit("error",error,ctx)
  }
  await next();
}


module.exports = {
  verifyMoment
}