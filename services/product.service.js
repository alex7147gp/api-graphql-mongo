const boom = require("@hapi/boom")
const { ProductModel } = require("../models/product.model");

const CategoryModel = require("../models/category.model");



class ProductService {

	async create(data) {
    const product = new ProductModel(data);
    try {
    	const newProduct = await product.save();
    	const category = await CategoryModel.findById(product.category);
    	category.products = [...category.products, newProduct];
    	await category.save()
    	return newProduct

    }

    catch (err) {
    	throw boom.conflict(err)
    }
	}

	async find(query) {
		  const { limit, offset } = query;
		  if (limit && offset) {
		  	return await ProductModel.find()
		  	  .skip(parseInt(offset))
		  	  .limi(parseInt(limit))
		  }
       
		  const product = await ProductModel.find().populate("category");

		  return product;

	}

	async findOne(id) {
    const product = await ProductModel.findById(id).populate("category");
    if (!product) {
    	throw boom.notFound("product not found")
    }
    return product
	}
	async update(id, changes) {
      const product = await ProductModel.findIdAndUpdate(id, changes, {
      	new: true,
      })
	    if (!product) {
	    	throw boom.notFound("product not found")
	    }
	    return product;
	}

	async delete(id) {
		  try {
		  	const product = await ProductModel.findByIdAndDelete(id)
		  	if(!product) {
		  		throw boom.notFound("product not found");
		  	}
		  	const category = await CategoryModel.findById(product.category);
		  	category.products.filter((item) => JSON.stringify(item) !== id);
		  	return product.id
		  }
		  catch (err) {
        throw boom.conflict(err)
		  }
	}	  
}

module.exports = ProductService;
