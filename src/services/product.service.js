
import db from "../models/index.js";
import imageService from "./image.service.js";
import sequelize from 'sequelize';

let getAllProducts = async () => {
  try {
      let products = await db.Products.findAll({
          attributes: ['Productid', 'Tensanpham', 'Giasanpham', 'Soluong', 'Mota'],
          include: [
              {
                  model: db.Categories,
                  as: 'Category',
                  attributes: ['Tenloai'],
              }
          ],
          raw: true
      });
      return products;
  } catch (e) {
      throw new Error(e);
  }
}


let createProduct = async (product) => {
  try {
    let newProduct = await db.Products.create(product);
    return newProduct;
  } catch (e) {
    throw new Error(e);
  }
};

let updateProduct = async (product, id) => {
  try {
    let result = await db.Products.update(product, { where: { Productid: id } });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

let deleteProductById = async (id) => {
  try {
    let respon = await imageService.removeImageByProductId(id);
    console.log(respon);
    let result = await db.Products.destroy({ where: { Productid: id } });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

let getProductById = async (id) => {
  try {
    let product = await db.Products.findOne({
      where: { Productid: id },
      attributes: ['Productid', 'Tensanpham', 'Giasanpham', 'Soluong', 'Mota', 'Categoryid'],
      raw: true
    });
    return product;
  } catch (e) {
    throw new Error(e);
  }
}
// const getListProducts = async (offset) => {
//   try {
//     const products = await db.Products.findAndCountAll({
//       attributes: ['Productid', 'Tensanpham', 'Giasanpham'],
//       include: [
//         {
//           model: db.Images,
//            // Limit the number of images returned
//            order: sequelize.literal('RAND()'), // Lấy một ảnh ngẫu nhiên cho mỗi sản phẩm
//           as: 'Images',
//          // Limit the number of images returned
//           attributes: ['Url'],
//           required: false, // Include images even if there are no associated images
//         }
//       ],
//       raw: true, // Return raw data
//       nest: true, // Nesting the associated data under a key matching the model name
//       offset: parseInt(offset), // Parse the offset to an integer
//       limit: 12, // Limit the number of products returnedxx// Group the products by Productid
//       subQuery: false 
//     });
//     console.log(products);
//     return products.rows;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
const getListProducts = async (offset) => {
  try {
    const products = await db.Products.findAndCountAll({
      attributes: ['Productid', 'Tensanpham', 'Giasanpham'],
      include: [
        {
          model: db.Images,
          as: 'Images',
          attributes: ['Url'],
          required: false, // Include images even if there are no associated images
          order: sequelize.literal('RAND()'), // Lấy một ảnh ngẫu nhiên cho mỗi sản phẩm

        }
      ],
      raw: true, // Return raw data
      nest: true, // Nesting the associated data under a key matching the model name
      offset: parseInt(offset), // Parse the offset to an integer
      limit: 12, // Limit the number of products returnedxx// Group the products by Productid
      subQuery: false, // Group the products by Productid
      group: ['Productid', 'Tensanpham', 'Giasanpham']
    });
    console.log(products);
    return products.rows;
  } catch (error) {
    throw new Error(error);
  }
};



export default {
  createProduct,
  updateProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getListProducts
};