const Blog = require('../models/blogModel');

class BlogService {
	static list() {
		return Blog.find({})
			.then((blogs)=>{
				return blogs;
			});
	}

	static read(blogid) {
		return Blog.findById(blogid)
			.then((foundBlog) => {
				return foundBlog;
			});
	}

	static create(obj) {
		let blog = new Blog(obj);
		return blog.save();
	}

	static update(id, obj) {
		return Blog.findById(id)
			.then((blog) => {
				blog.set(obj);
				blog.save();
				return blog;
			});
	}

	static delete(blogid) {
		return Blog.deleteOne({_id: blogid})
			.then((deletedBlog)=> {
				return deletedBlog}
			);
	}
}

module.exports.BlogService = BlogService;