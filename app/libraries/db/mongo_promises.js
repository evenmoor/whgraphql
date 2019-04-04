const _mongoInsertOne = ({ collection, doc }) => (
    new Promise((resolve, reject) => {
    	const return_object = { 
    		success : true, 
    		error : '', 
    		doc 
    	};

    	_db.collection(collection).insertOne(doc, function(err, res) {
		    if (err) { 
		    	return_object.success = false;
		    	return_object.error = err.toString();
		    }
		    resolve(return_object);
	    });
	})
);

const _mongoQuery = ({ collection, query }) => (
	new Promise((resolve, reject) => {
		const return_object = { 
    		success : true, 
    		error : '', 
    		docs : [] 
    	};

    	_db.collection(collection).find(query).toArray(function(err, res) {
		    if (err) { 
		    	return_object.success = false;
		    	return_object.error = err.toString();
		    }else{
		    	return_object.docs = res;
		    }
		    resolve(return_object);
	    });
	})
);

const _mongoDropCollection = ({ collection }) => (
	new Promise((resolve, reject) => {
		const return_object = { 
    		success : true, 
    		error : ''
    	};

    	_db.collection(collection).drop(function(err, res) {
		    if (err) { 
		    	return_object.success = false;
		    	return_object.error = err.toString();
		    }

		    resolve(return_object);
	    });
	})
);

module.exports = {
	insert : _mongoInsertOne,
	query : _mongoQuery,
	clear : _mongoDropCollection
}