const express = require("express")
const routerApi = require("./routes")

const cors = require("cors")
const config = require("./config/config");

const { logErrors, errorHandler, boomErrorHandler } = require("./middleware/error.handler.js")
const { checkApiKey } = require("./middleware/auth.handler")
const connectDb = require("./libs/mongoose");

const corsApi = require("./utils/cors");


const useGraphql = require("./graphql");

const createApp = async () => {

const app = express()

app.use(express.json())

app.use(cors());

require("./utils/auth");

connectDb(config.mongoDbUri);

app.get("/", (req, res) => {
	res.send("Hello!")
})

app.get("/nueva-ruta", checkApiKey, (req, res) => {
	res.send("Helo i am a new way")
} )

routerApi(app)

await useGraphql(app)

app.use(logErrors)

app.use(boomErrorHandler)

app.use(errorHandler)

return app;

};

module.exports = createApp;