const teamorderService = require("../service/teamorder.service")

class TeamorderController {
  async create(ctx, next) {
   try {
      //获取用户请求传递的参数
    const product = ctx.request.body;
    const { id } = ctx.user;
    //查询数据
    const result = await teamorderService.create(product.productId, id);
    //返回数据
    ctx.body = result;
   } catch (error) {
     console.log(error)
   }
  }
  async teamorderInfo(ctx, next) {
    try {
       //获取用户请求传递的参数
     const product = ctx.params;
     //查询数据
     const result = await teamorderService.getNoTeamorder(product.productId);
     let teamorderArray = [];
     if(result.length % 2 === 0){
       for(let i = 0; i < result.length ; i=i+2){
         let arr = [result[i],result[i+1]];
         teamorderArray.push(arr);
       }
     }else if(result.length % 2 !== 0){
      for(let i = 0; i < result.length ; i=i+2){
        if(i === result.length-1){
          let arr = [result[i],result[0]];
         teamorderArray.push(arr);
        }else{
          let arr = [result[i],result[i+1]];
          teamorderArray.push(arr);
        }
      }
     }
     //返回数据
     ctx.body = teamorderArray;
    } catch (error) {
      console.log(error)
    }
   }
   
   async updateTeamorder(ctx, next){
     try {
      const {
        productId,userId
      } = ctx.request.body;
      const userId2 = ctx.user.id;
      const result = teamorderService.updateTeamorderStatus(productId,userId,userId2)
      ctx.body = "拼单成功~"
     } catch (error) {
       console.log(error)
     }
   }
  
 
  
}

module.exports = new TeamorderController();