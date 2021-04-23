const Router = require ('koa-router');

const {
  verifyAuth
} = require ('../middleware/auth.middleware');
const { 
  avatarHandler,
  pictureHandler,
  pictureResize,
  momentHandler
 } = require('../middleware/file.middleware');

const { 
  saveAvatarInfo,
  savePictureInfo,
  saveMomentInfo
 } = require('../controller/file.controller');



const fileRouter = new Router({prefix: '/upload'});
fileRouter.post('/avatar', verifyAuth, avatarHandler,saveAvatarInfo)
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize,savePictureInfo)
fileRouter.post('/moment', verifyAuth, momentHandler, pictureResize, saveMomentInfo)

module.exports = fileRouter;