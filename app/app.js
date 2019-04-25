const assert = require('assert'); //assert for error checking
const express = require('express'); //express as a quick web server
const graphqlHTTP = require('express-graphql'); //graphql for express
const graphql = require('graphql'); //actual graphql
const MongoClient = require('mongodb').MongoClient; //mongo
const routes = require('./routes');//handle routing for non-graph items

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

//expose the assets directory for static file access
_app.use(express.static('/mnt/app/assets'));

//mount our fancy routes
_app.use('/', routes);

// connect to mongo
MongoClient.connect(app.config.database.location, { useNewUrlParser: true }, function(err, client) {
	assert.equal(null, err);
	_db = client.db(app.config.database.name);
});

//build a new server for socket.io
const _http = require('http').Server(_app);

//add socket.io rooms
const _io = require('./webSockets').listen(_http);

//start the express app listening
_http.listen(app.config.system.port, () => console.log(`App listening on ${app.config.system.port}!`));