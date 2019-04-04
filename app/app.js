const assert = require('assert'); //assert for error checking
const express = require('express'); //express as a quick web server
const graphqlHTTP = require('express-graphql'); //graphql for express
const graphql = require('graphql'); //actual graphql
const MongoClient = require('mongodb').MongoClient; //mongo

const _app = express();
_db = "";//globally expose the database connection. NEVER DO THIS IN PRODUCTION!

//bring in the components
const app = require('/mnt/app/libraries/app/app.js');
const warmahordes_graph = require('/mnt/app/graphql/schemas/warmahordes.js');

//handle graph requests
_app.use('/graph', graphqlHTTP({
	schema: graphql.buildSchema(warmahordes_graph.schema),
	rootValue: warmahordes_graph.resolvers,
	graphiql: true
}));

//handle any other request
_app.get('*', function (req, res) {
	res.send('Express is running. GraphQL should be accessible at /graph');
})

// connect to mongo
MongoClient.connect(app.config.database.location, { useNewUrlParser: true }, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to mongo server");
	_db = client.db(app.config.database.name);
});

//start the express app listening
_app.listen(app.config.system.port, () => console.log(`App listening on ${app.config.system.port}!`));