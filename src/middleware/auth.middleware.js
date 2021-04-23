const jwt = require('jsonwebtoken')

const service = require('../service/user.service')
const errorTypes = require('../constants/error-types')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const verifyLogin = async (ctx,next) => {
  //1.获取用户名和密码
  const { name, password } = ctx.request.body;

  //2.判断用户名或者密码不能为空
  if(!name || !password ){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error",error,ctx)
  }

  //3.判断这次注册的用户名是没有被注册过的
  const result = await service.getUserByName(name);
  const user = result[0];
  if(!user){
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error',error,ctx)
  }
  //4.对密码进行加密和数据库进行比对
  if(md5password(password) !== user.password){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error',error,ctx)
  }
  ctx.user = user

  await next();
}

const verifyAuth = async (ctx,next) => {
  console.log("验证授权的middleware~");
  //1.获取token
  const authorization = ctx.headers.authorization;
  const token = authorization.replace('Bearer ','')
  //2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY , {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}

