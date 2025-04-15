const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: {type: String, required: true},
		detail: {type: String, required: true},
		createdAt: {type: Date},
		updatedAt: {type: Date}
	}
);

schema.pre('save', function(next){
	if (!this.createdAt) {
		this.createdAt = new Date();
	}
	else {
		this.updatedAt = new Date();
	}
	
	next();
});

module.exports = mongoose.model("Blog", schema);