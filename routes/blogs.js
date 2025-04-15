const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const blogController = require('../controllers/blogController');
const BlogService = blogController.BlogService;

router.get('/', (req, res, next) => {
	BlogService.list()
		.then((blogs)=>{
			res.render('home', {
				title: 'My Tech Blog',
				blogs: blogs
			});
		})
		.catch((err) => {
			if (err) console.log(err);
			throw new Error("blogsNotFoundError");
		});
});

router.get('/:blogid', (req, res, next) => {
	console.log(`finding ${req.params.blogid}`);
	BlogService.read(req.params.blogid)
		.then((blog) => {
			if(blog === null) {
				res.end("Error finding the blog!");
			}
			res.render('updatedeleteblog', {
				title: 'Blog Details',
				blog: blog
			});			
		})
		.catch((err) => {
			console.log(err);
			throw new Error("blogNotFoundError");
		})
});

router.post('/', (req, res, next) => {
	let blogData = {
		title: req.body.title,
		detail: req.body.detail
	}

	BlogService.create(blogData)
		.then(() => {
			res.redirect("/blogs");
		})
		.catch((err) => {
			console.log(err);
			throw new Error("BlogCreateError");
		});
});

router.post('/:blogid', (req, res, next)=> {
	if (req.body.actiontype === 'delete')
	{
		BlogService.delete(req.params.blogid)
			.then(() => {
				res.redirect('/blogs');
			})
			.catch((err) => {
				throw new Error("blogUpdateDeleteError");
			});
	}
	else {
		let blogData = {
			title: req.body.title,
			detail: req.body.detail
		}

		BlogService.update(req.params.blogid, blogData)
			.then(() => {
				res.redirect('/blogs');
			})
			.catch((err) => {
				throw new Error("blogUpdateDeleteError");
			});
	}
});

router.use(function(err, req, res, next) {
	//console.log(err.stack);
	if (err.message == "blogsNotFoundError"){
		res.end("Unable to Load the Page");
	}
	if (err.message == "blogNotFoundError"){
		res.end("Unable to Find the Blog");
	}
	else if (err.message == "blogCreateError"){
		res.end("Unable to Create New Blog");
	}
	else if (err.message == "blogUpdateDeleteError"){
		res.end("Unable to Update or Delete Blog");
	}
	else {
		next(err);
	}
});

module.exports = router;