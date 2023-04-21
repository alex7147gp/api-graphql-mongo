const CategoryService = require("../services/category.service")
const service = new CategoryService()

const boom = require("@hapi/boom");


const category = async (_, { id }) => {
    const category = await service.findOne(id)
	return category;
}

const categories = async () => {
    const categories = await service.find()
    console.log(categories)
	return categories;
}

const addCategory = async (_, { dto }, context) => {
	const { user } = await context.authenticate("jwt", { session: false });
    if (!user) {
       throw boom.unauthorized("jwt is not valid")
    }
    const newCategory = await service.create({ ...dto, image: dto.image.href })
	return newCategory;
}

const updateCategory = async (_, { id, dto }) => {
    const category = await service.update(id, dto);
    return category;
}

const deleteCategory = async (_, { id }) => {
    const rta = await service.delete(id);
    return rta;
}

module.exports = { category, categories, addCategory, updateCategory, deleteCategory }