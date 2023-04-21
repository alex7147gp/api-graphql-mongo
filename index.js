const createApp = require("./app");
const config = require("./config/config");


(async () => {
	const port = config.port || 3000;
	const app = await createApp();
	app.listen(port, () => {
		console.log(`Mi port ${port}`)
	});
})();