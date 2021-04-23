const connection = require('../app/database')

class ProductService{
  async createProduct(product){
    const { 
      productName, productOriginalPrice, productFavorablePrice, productClassification, isAcceptTogether, productDesc
    } = product;
    const statement = `INSERT INTO product ( product_name, product_original_price, product_favorable_price, product_classification, is_accept_together, product_desc) VALUES (?,?,?,?,?,?)`;
    const result = await connection.execute(statement,[ productName, productOriginalPrice, productFavorablePrice, productClassification, isAcceptTogether, productDesc]);
    return result[0]
  }


  async getProductByName(productName){
    const statement = `SELECT product_id productId FROM product WHERE product_name = ?;`;
    const result = await connection.execute(statement,[productName]);
    return result[0];
  }

  async getProductList(offset, size){
    const statement = `SELECT 
    p.product_id productId,p.product_name productName, 
    p.product_original_price productOriginalPrice,
    p.product_favorable_price productFavorablePrice,
    p.product_classification productClassification,
    p.createAt createAt,p.updateAt updateAt,
    p.is_accept_together isAcceptTogether,
    p.product_desc productDesc,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/product/images/', file.filename)) 
             FROM file WHERE p.product_id = file.product_id ) images,
    (SELECT CONCAT('http://localhost:8000/product/images/', file.filename) 
             FROM file WHERE p.product_id = file.product_id limit 1) image                   
    FROM product p
     LIMIT ?, ?;`;
    const [result] = await connection.execute(statement,[offset,size]);
    return result;
  }
  async getProductCount(){
    const statement = `SELECT count(*) productCount FROM product ;`;
    const [result] = await connection.execute(statement);
    return result[0];
  }
  async getProductByProcuctId(productId){
    const statement = `SELECT 
    p.product_id productId,p.product_name productName, 
    p.product_original_price productOriginalPrice,
    p.product_favorable_price productFavorablePrice,
    p.product_classification productClassification,
    p.createAt createAt,p.updateAt updateAt,
    p.is_accept_together isAcceptTogether,
    p.product_desc productDesc,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/product/images/', file.filename)) 
             FROM file WHERE p.product_id = file.product_id ) images                  
    FROM product p 
		WHERE product_id = ?;`;
    const [result] = await connection.execute(statement,[productId]);
    return result[0];
  }
}
module.exports = new ProductService();
