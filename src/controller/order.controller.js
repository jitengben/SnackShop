const orderService = require("../service/order.service")

class OrderController {
  async create(ctx, next) {
   try {
      //获取用户请求传递的参数
      const { 
        userId, price, status,address,productId,productNum,remarks
      } = ctx.request.body;
      const { id } = ctx.user;
    //查询数据
    const result = await orderService.create(userId, price, status,address,productId, id, productNum,remarks);
    //返回数据
    ctx.body = result;
   } catch (error) {
     console.log(error)
   }
   
  }
  async orderInfo(ctx, next) {
    try {
       //获取用户请求传递的参数
     const { orderId } = ctx.params;
     //查询数据
     const result = await orderService.getOrderInfoById(orderId);
     //返回数据
     ctx.body = result;
    } catch (error) {
      console.log(error)
    }
    
   }
}

module.exports = new OrderController();