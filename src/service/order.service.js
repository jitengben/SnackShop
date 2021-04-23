const connection = require('../app/database')

class OrderService{
  async create(userId, price, status,address,productId, id,productNum,remarks){
    try {
      let orderId = ""
      if(userId){
        //入拼单成功用户订单
        //将发起拼单人的订单状态和拼单用户修改
        const changOrderStatus = 'UPDATE `orders` SET team_user_id = ? , status = ? WHERE id = (SELECT order_id FROM teamorder WHERE user1_id = ? and product_id = ?)';
        await connection.execute(changOrderStatus,[id, status, userId, productId ])
        const statement = 'INSERT INTO `orders` ( user_id, price, status, address, team_user_id, remarks) VALUES (?,?,?,?,?,?); ';
        const result = await connection.execute(statement,[id, price, status, address, userId, remarks]);
        orderId = result[0].insertId;
        const statement1 = `INSERT INTO order_product ( order_id, product_id, number) VALUES  ( ?, ?, ?);`;
        await connection.execute(statement1, [orderId , productId, productNum])
      }else{
        //入发起拼单用户订单
        const statement = 'INSERT INTO `orders` ( user_id, price, status, address, team_user_id, remarks) VALUES (?,?,?,?,NULL,?); ';
        const result = await connection.execute(statement,[id, price, status, address,  remarks]);
        orderId = result[0].insertId;
        const statement2 = `UPDATE teamorder SET order_id = ? where user1_id = ? and product_id = ? and status = '0';`;
        await connection.execute(statement2, [orderId, id, productId])
        const statement1 = `INSERT INTO order_product ( order_id, product_id, number) VALUES  ( ?, ?, ?);`;
        await connection.execute(statement1, [orderId , productId, productNum])
      }
      
      return orderId;
    } catch (error) {
      console.log(error)
    }
  }
  async getOrderInfoById(orderId){
    try {
      const statement = `SELECT o.id orderId, o.price price,o.address address,o.remarks remarks,o.status status,o.createAt createAt,
      op.number number,p.product_name productName,p.product_id productId,
      (SELECT CONCAT('http://localhost:8000/product/images/', file.filename) 
                   FROM file WHERE p.product_id = file.product_id limit 1) image 
      from orders o
      LEFT JOIN order_product op ON o.id = op.order_id
      LEFT JOIN product p ON op.product_id = p.product_id
       where o.id = ?  `;
      const [result] = await connection.execute(statement, [orderId])
      return result[0];
    } catch (error) {
      console.log(error)
    }
  }
  
}
module.exports = new OrderService();