import Product from '../../models/product.js';
  
export default {
    products: async () => {
      try {
        const products = await Product.find();
        return products.map(product => {
          return {
            ...product._doc,
            _id: product.id,
          };
        });
      } catch (err) {
        throw err;
      }
    },
    getProductByID: async ({productId}) => {
      try {
        const foundProduct = await Product.findOne({ _id: productId }).exec();
        if (foundProduct == null || foundProduct == undefined) throw new Error('No product exists with id: ' + productId);
        return foundProduct;
      } catch (err) {
        throw new Error('No product exists with id: ' + productId);
      }
    },
    getProductByName: async ({productName}) => {
      try {
        const foundProduct = await Product.findOne({ name: productName }).exec();
        if (foundProduct == null || foundProduct == undefined) throw new Error('No product exists with name: ' + productName);
        return foundProduct;
      } catch (err) {
        throw new Error('No product exists with name: ' + productName);
      }
    },
    createProduct: async ({input}) => {
      const foundProduct = await Product.findOne({ name: input.name }).exec();
      if (foundProduct != null || foundProduct != undefined) throw new Error('Product with name already exists: ' + input.name);
      const product = await Product.create(input);
      return product;
    }
  };
  