const connection = require('../app/database');

class FileService{
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) 
    VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
    return result;
  }
  async createFile(filename, mimetype, size, productId) {
    const statement = `INSERT INTO file (filename, mimetype, size, product_id) 
    VALUES (?, ?, ?, ? )`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, productId]);
    return result;
  }
  async createMoment(filename, mimetype, size, momentId) {
    const statement = `INSERT INTO moment_picture (filename, mimetype, size, moment_id) 
    VALUES (?, ?, ?, ? )`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, momentId]);
    return result;
  }
  async getAvatarByUserId(userId){
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
  async getMomentPictureByFilename(filename) {
    const statement = `SELECT * FROM moment_picture WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}
module.exports = new FileService();