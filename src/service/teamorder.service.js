const connection = require('../app/database')

class TeamorderService{
  async create(productId, id){
    const status = 0;
    const statement = `INSERT INTO teamorder (product_id,user1_id,status) VALUES (?,?,?); `
    const result = await connection.execute(statement,[productId, id, status]);
    return result[0];
  }
  async getNoTeamorder(productId){
    const statement = `SELECT id 'id' , name 'name', avatar_url 'avatarUrl' FROM user WHERE id IN (SELECT DISTINCT user1_id FROM teamorder WHERE product_id = ? AND status = 0) and is_admin=0`
    const [result] = await connection.execute(statement,[productId]);
    return result;
  }
  async isTeamorder(productId, userId){
    try {
      const statement = `SELECT * FROM teamorder WHERE product_id = ? AND user1_id = ? and status = '0'`
      const  result = await connection.execute(statement,[productId, userId]);
      return result[0];
    } catch (error) {
      console.log(error)
    }
  }
  
  async updateTeamorderStatus(productId, userId, userId2){
    const statement = `UPDATE teamorder set user2_id = ?, status = 1 where product_id = ? and user1_id = ?;`
    const result = await connection.execute(statement,[userId2, productId, userId]);
    return result;
  }
}
module.exports = new TeamorderService();