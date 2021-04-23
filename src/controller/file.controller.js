const { APP_HOST, APP_PORT } = require('../app/config')
const fileService = require('../service/file.service')
const service = require('../service/file.service')
const userService = require('../service/user.service')
class fileController {
  async saveAvatarInfo(ctx, next){
    const {filename, mimetype, size} = ctx.req.file
    const {id} = ctx.user
    const result = await service.createAvatar(filename, mimetype, size, id)
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(id,avatarUrl);
    ctx.body = '上传头像成功';
  }
  async savePictureInfo(ctx, next){
    const files = ctx.req.files;
    const { productId } = ctx.query;
    for(let file of files){
      const { filename, mimetype, size} = file;
      await fileService.createFile(filename, mimetype, size, productId);
    }
    ctx.body = '商品图片上传成功~'
  }
  async saveMomentInfo(ctx, next){
    try {
      const files = ctx.req.files;
      const { momentId } = ctx.query;
      for(let file of files){
        const { filename, mimetype, size} = file;
        await fileService.createMoment(filename, mimetype, size, momentId);
      }
      ctx.body = '评论图片上传成功~'
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new fileController()