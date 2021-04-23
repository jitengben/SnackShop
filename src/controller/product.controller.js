const fs = require('fs')

const service = require("../service/product.service")

const { PICTURE_PATH } = require('../constants/file-path');
const fileService = require('../service/file.service');

class ProductController {
  async create(ctx, next) {
    //获取用户请求传递的参数
    const product = ctx.request.body;
    //查询数据
    await service.createProduct(product);
    const result = await service.getProductByName(product.productName)
    //返回数据
    ctx.body = result[0];
  }
  async fileInfo(ctx, next){
    try {
      let {filename} = ctx.params;
      const fileInfo = await fileService.getFileByFilename(filename);
      const { type } = ctx.query;
      const types = ["small", "middle", "large"];
      if (types.some(item => item === type)) {
        filename = filename + '-' + type;
      }
      ctx.response.set('content-type', fileInfo.mimetype);
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    } catch (error) {
      console.log(error)
    }
  }
 
  async list(ctx, next){
    const { offset, size } = ctx.query;
    const result = await service.getProductList(offset, size);
    ctx.body = result
  }
  async productCount(ctx, next){
    const result = await service.getProductCount();
    ctx.body = result
  }
  async productInfo(ctx, next){
    const { productId } = ctx.params;
    const result = await service.getProductByProcuctId(productId);
    ctx.body = result
  }
}

module.exports = new ProductController();