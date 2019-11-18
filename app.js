var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//App Config ------------------------------------------------------------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/Blog_Website', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//Schema Setup Mongoose Model Config ----------------------------------------------------------------------------------------------
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema)

	//CREATE A SAMPLE BLOG IN DATABASE
	// Blog.create({
	// 	title: 'Test Blog',
	// 	image: 'https://images.unsplash.com/photo-1574012716378-0ca6f4c18c08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1563&q=80',
	// 	body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
	// });

// RESTFUL Routes -------------------------------------------------------------------------------------------------------------------

//NUMBER 1
app.get('/', function (req, res){
		res.redirect('/blogs')
})

// NUMBER 2
app.get('/blogs', function (req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err)
		} else {
			res.render('index', {blogs: blogs})
		}
	})
});

// NUMBER 3 ADD A NEW BLOG
app.get('/blogs/new', function (req, res){
	res.render('new')
});

// NUMBER 4 POST A NEW BLOG
app.post('/blogs', function (req, res){
	
	//create new blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			console.log(err)
		} else {
			res.redirect('/blogs')
		}
	})
});
// NUMBER 5 GET BLOG ID URL
app.get('/blogs/:id', function (req, res){
		Blog.findById(req.params.id, function (err, foundBlog){
			if(err){
				console.log(err);
			} else {
				res.render('show', {blog: foundBlog})
			}
		})
})

// NUMBER 6 EDIT BLOG POST
app.get('/blogs/:id/edit', function (req, res){
	Blog.findById(req.params.id, function (err, foundBlog){
		if(err){
			res.redirect('/blogs')
		} else {
			res.render('edit', {blog: foundBlog})
		}
	})
})

//UPDATE ROUTE FOR BLOGS/:ID PUT REQUEST
app.put('/blogs/:id', function (req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog){
		if(err){
			res.redirect('/blogs')
		} else {
			res.redirect('/blogs/' + req.params.id)
		}
	})
});









//Tel express to listen for requests - start server
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});