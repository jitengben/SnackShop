const errorTypes = require('../constants/error-types')

const errorHandler = (error,ctx) => {
  let status,message;
  switch (error.message){
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;//Bad Request
      message = "用户名或密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;//conflict(冲突)
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400;//conflict(冲突)
      message = "用户名不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400;//参数错误
      message = "密码是不正确的~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "无效的token~";
      break;
    case errorTypes.PRODUCTMESSAGE_IS_REQUIRED:
      status = 400;
      message = "商品信息不能为空~";
      break;
    case errorTypes.PRODUCT_ALREADY_EXISTS:
      status = 409;
      message = "商品名已经存在~";
      break;
    case errorTypes.USER_AVATAR_ALREADY_EXISTS:
      status = 409;
      message = "用户已经注册过头像~";
      break;
    case errorTypes.CONTENT_IS_REQUIRED:
      status = 400;
      message = "评论内容不能为空~";
      break;
    case errorTypes.PRODUCTID_OR_USERID_IS_REQUIRED:
      status = 400;
      message = "用户Id或商品Id不能为空~" 
      break;
    case errorTypes.TEAMORDER_ALREADY_EXISTS:
      status = 409;
      message = "已经发起过拼单~";
      break;
    case errorTypes.ORDERMESSAGE_IS_REQUIRED:
      status = 400;
      message = "订单信息不能为空~";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
      break;
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler