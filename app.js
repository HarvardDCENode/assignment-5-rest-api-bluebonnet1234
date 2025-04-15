const express = require('express');
const path = require('path');
const blogrouter = require('./routes/blogs');
var apiblogs = require('./routes/api/api-blogs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.CSCIEDB_USER}:${process.env.CSCIEDB_PWD}@cluster0.m8nb61r.mongodb.net/cscie31?retryWrites=true&w=majority&appName=Cluster0`)
.catch((err)=>{
	console.error(`database connection error: ${err}`);
	process.exit();
 });

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res, next) => {
	res.redirect('/blogs');
});
app.use('/blogs', blogrouter);
app.use('/api/blogs', apiblogs);
app.use((req, res, next) => {
	res.redirect('/static/notfound.html')
});

module.exports = app;