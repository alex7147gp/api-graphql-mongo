const ProductService = require("./../services/product.service")
const service = new ProductService()





const product = async (_, { id }) => {
    const product = await service.findOne(id)
	return product;
}

const products = async () => {
    const products = await service.find({})
    return products;
}

const addProduct = async (_, { dto }) => {
	const newProduct = await service.create(dto)
    console.log(newProduct)
	return newProduct;
}

const updateProduct = async (_, { id, dto }) => {
    const product = await service.update(id, dto);
    return product;
}

const deleteProduct = async (_, { id }) => {
    const rta = await service.delete(id);
    return rta;
}

const getProductsByCategory = (parent) => {
  return []
}

module.exports = { product, products, addProduct, updateProduct, deleteProduct, getProductsByCategory };