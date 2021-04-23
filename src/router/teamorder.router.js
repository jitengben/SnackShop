const Router = require('koa-router')

const{
  verifyAuth
} = require('../middleware/auth.middleware')

const{
  create,
  teamorderInfo,
  updateTeamorder
} = require('../controller/teamorder.controller')

const {
  verifyTeamorder
} = require('../middleware/teamorder.middleware')

const teamorderRouter = new Router({ prefix: '/teamorder' })

teamorderRouter.post('/' , verifyAuth , create)
teamorderRouter.get('/:productId',teamorderInfo)
teamorderRouter.patch('/', verifyAuth, verifyTeamorder, updateTeamorder)

module.exports =teamorderRouter;