const connection = require('../app/database')

class MomentService{
  async createMoment(moment,id){
    try {
      const { 
        content,productId,orderId,stars
      } = moment;
      const statement = `INSERT INTO moment (content,user_id,product_id,order_id, stars) VALUES (?,?,?,?,?)`;
      const result = await connection.execute(statement,[ content, id, productId, orderId, stars]);
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }
  
  async getMomentByProductId(productId){
    const statement = `
    SELECT 
					m.id id,m.content content,m.product_id productId, 
					JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url ) author ,
					(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', moment_picture.filename)) 
					FROM moment_picture WHERE m.id = moment_picture.moment_id) images										
					FROM moment m  
					LEFT JOIN user u ON m.user_id = u.id
					WHERE m.product_id = ?;`;
    const [result] = await connection.execute(statement,[ productId ]);
    return result
  }

  
}
module.exports = new MomentService();
