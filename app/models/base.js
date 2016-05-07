var mongoose = require('mongoose');

module.exports = function baseModel(schema, options) {
  schema.add({createdAt: {type: Date, default: Date.now}});
  schema.add({updatedAt: {type: Date, default: Date.now}});
  schema.add({deletedAt: {type: Date, default: null}});

	schema.statics.query = function execQuery() {
		let query = this.find({
      '$or': [
        {deletedAt: {'$exists': false}},
        {deletedAt: null},
      ]
    });

		return query;
	};
}
