const mongo_promises = require('/mnt/app/libraries/db/mongo_promises.js');

const _schema = `
	type model {
		_id : String,
		name: String,
		str : Int,
		mat : Int,
		rat : Int,
		def : Int,
		arm : Int
	}

	type models_query {
		success : Boolean,
		error : String,
		docs : [model]
	}

	type model_insert_result {
		success : Boolean,
		error : String,
		doc : model
	}

	type clear_data_result {
		success : Boolean,
		error : String
	}

	input model_input {
		name: String,
		str : Int,
		mat : Int,
		rat : Int,
		def : Int,
		arm : Int
	}

	input models_filter { 
		name : String
	}

	input clear_data_input {
		collection : String
	}

	type Mutation {
		addModel( input : model_input! ) : model_insert_result!
		clear_data( input : clear_data_input! ) : clear_data_result!
	}

	type Query {
		models( filter : models_filter ) : models_query
	}
`;

const _resolvers = {
	addModel : async ({ input }) => {
		const return_object = await mongo_promises.insert({ collection : 'models', doc : input });
		return return_object;
	},

	clear_data : async ({ input }) => {
		const return_object = await mongo_promises.clear({ collection : input.collection });
		return return_object;
	},

	models : async ({ filter }) => {
		const return_object = await mongo_promises.query({ collection : 'models', query : filter });
		return return_object;
	},
};

module.exports = {
	schema : _schema,
	resolvers : _resolvers
}