const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("@apollo/server-plugin-landing-page-graphql-playground");

const { ApolloServerPluginUsageReporting } = require('apollo-server-core');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')

const path = require("path")
const { expressMiddleware } = require('@apollo/server/express4');
const { readFileSync } = require("fs");
const resolvers = require("./resolvers")

const { buildContext } = require("graphql-passport")

const useGraphql = async (app) => {
    
	const server = new ApolloServer({
		typeDefs: readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
		resolvers,
		introspection: true,
		playground: true,
		plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground(),
		]
	});
	await server.start()
	app.use(expressMiddleware(server, {
	    context: ({req, res}) => buildContext({req, res})	
	}));
}

module.exports = useGraphql;