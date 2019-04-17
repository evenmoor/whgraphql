const routes = require('express').Router();
const models = require('./models');

routes.use('/models', models);

routes.get('*', function (req, res) {
	res.send(`
		<h1>Hello!</h1>
		<ul>
			<li>Express is running.</li>
			<li>GraphQL should be accessible at <a href='/graph'>/graph</a></li>
			<li>Models are browsable at <a href='/models'>/models</a></li>
		</ul>
	`);
})

module.exports = routes;