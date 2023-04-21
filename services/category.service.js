const CategoryModel = require("../models/category.model")
const boom = require("@hapi/boom")

const { ProductModel } = require("../models/product.model");
class CategorieService {


	async create(data) {
    const newCategory = new CategoryModel(data);
    try {
      return await newCategory.save();      
    }
    catch (err) {
    	throw boom.conflict('error of service '+err)
    }
	}

	async find() {
      return await CategoryModel.find().populate("products");
	}

	async findOne(id) {
		  const category = await CategoryModel.findById(id).populate("products");
      console.log(category);
		  if(!category) {
		  	throw boom.notFound("category not found");
		  }
      return category
	}

	async update(id, changes) {
      const category = await CategoryModel.findByIdAndUpdate(id, changes, {
      	new: true,
      })
      if(!category) {
      	throw boom.notFound("category not found");
      }

      return category
	}

	async delete(id) {
      const category = await CategoryModel.findByIdAndDelete(id);
      if(!category) {
      	throw boom.notFound("category not found")
      }

      return category;
	}
}

module.exports = CategorieService;