const AuthService = require("./../services/auth.service");


const service = new AuthService();
const checkRolesGql = require("../utils/checkRolesGql")

const login = async (_, { email, password }, context) => {
	const { user } = await context.authenticate('graphql-local', (email, password));
	checkRolesGql(user, "admin")
	return service.signToken(user)
}

module.exports = { login };