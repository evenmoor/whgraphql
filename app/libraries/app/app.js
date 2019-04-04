const _appConfig = {
	system : {
		port : 8080
	},
	database : {
		type : 'mongo',
		location : 'mongodb://localhost:27017',
		name : 'warmahordes'
	}
}

module.exports = {
	config : _appConfig
}