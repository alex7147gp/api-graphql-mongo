const { product, products, addProduct, updateProduct, deleteProduct, getProductsByCategory } = require("./product.resolvers");
const { login } = require("./auth.resolvers");

const { category, categories, addCategory, updateCategory, deleteCategory } = require("./category.resolvers");


const resolvers = {
	Query: {
	  hello: () => "hello world",
      getPerson: (_, args) => `Hello ${args.name} you are ${args.age} years old`,
	  getInt: () => 1,
	  getFloat: () => 1.1,
	  getBoolean: () => true,
	  getID: () => "1212121212",
	  getNumbers: (_, argps) => args.numbers,
      //Products
      product,
      products,
      //Users
      //Category
      category,
      categories
      //Auth
	},
	
	Mutation: {
		//Product
		addProduct,
		updateProduct,
		deleteProduct,
		//User
		
		//Category
		addCategory,
		//updateCategory,
		//deleteCategory,
		//auth
	    login
	},
}

module.exports = resolvers