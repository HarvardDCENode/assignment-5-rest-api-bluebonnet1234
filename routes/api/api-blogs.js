const express = require('express');
const router = express.Router();
const Blog = require('../../models/blogModel');
const blogController = require('../../controllers/blogController');
const BlogService = blogController.BlogService;

router.use((req, res, next)=>{
	res.set({
	  'Access-Control-Allow-Origin':'*',
	  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
	  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
	//   'Content-type':'application/json'
	});

	if (req.method == 'OPTIONS') {
	  return res.status(200).end();
	}

	next();
});

//Get all existing blogs
router.get('/', (req, res, next) => {
	BlogService.list()
		.then((blogs) => {
			console.log(`API found ${blogs}`);
			res.status(200);
			res.json(blogs);
		});
});

//Get single blog by id
router.get('/:blogid', (req, res, next) => {
	BlogService.read(req.params.blogid)
		.then((blog) => {
			console.log(`API found ${blog}`);
			res.status(200);
			res.json(blog);
		});
});

//Create a new blog
router.post('/', (req, res, next) => {
	console.log(req.body);
	let blogData = {
		title: req.body.title,
		detail: req.body.detail
	}

	BlogService.create(blogData)
		.then((savedBlog) => {
			console.log(`API saved ${savedBlog}`);
			res.status(200);
			res.json(savedBlog);
		})
		.catch((err) => {
			console.log(`API blogCreateError stack ${err}`);
			res.status(404);
			res.end();
		});
});

//Update single blog by id
router.put('/:blogid', (req, res, next)=> {
	console.log(`API updating blog ${req.params.blogid}`);
	let blogData = req.body;

	BlogService.update(req.params.blogid, blogData)
		.then((updatedBlog) => {
			res.status(200);
			res.json(updatedBlog);
		})
		.catch((err) => {
			console.log(`API blogUpdateError stack ${err}`);
			res.status(404);
			res.end();
		});
});

//Delete single blog by id
router.delete('/:blogid', (req, res, next) => {
	console.log(`API deleting blog ${req.params.blogid}`);
	
	BlogService.delete(req.params.blogid)
		.then((deletedBlog) => {
			res.status(200);
			res.json(deletedBlog);
		})
		.catch((err) => {
			console.log(`API blogDeleteError stack ${err}`);
			res.status(404);
			res.end();
		});
});

module.exports = router;