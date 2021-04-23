const connection = require('../app/database')

class UserService{
  async create(user){
    const{ name, password, isAdmin } = user;
    const statement = `INSERT INTO user (name, password, is_admin) VALUES (?,?,?)`

    const result = await connection.execute(statement,[name, password, isAdmin]);
    return result[0]
  }

  async getUserByName(name){
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement,[name]);
    return result[0];
  }

  async getAvatarByUserId(id){
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const result = await connection.execute(statement,[id]);
    return result[0]
  }
  async updateAvatarUrlById(id, avatarUrl){
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`;
    const [result] = await connection.execute(statement,[ avatarUrl, id]);
    return result;
  }
}
module.exports = new UserService();