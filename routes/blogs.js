// Routing file pertaining to blogs
const errors = require('restify-errors');
const Blog = require('../models/Blog');

module.exports = server => {
    // Get blogs
    server.get('/blogs', async (req, res, next) => {
        try {
            const blogs = await Blog.find({});
            res.send(blogs);
            next();
        } catch(err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get single blog
    server.get('/blogs/:id', async (req, res, next) => {
        try {
            const blog = await Blog.findById(req.params.id);
            if(blog._id === null) throw err;
            res.send(blog);
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no blog with the id of ${req.params.id}`));
        }
    });

    // Add blog
    server.post('/blogs', async (req, res, next) => {
        // Check for JSON
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { title, description, text, date } = req.body; // Using destructuring to get values from body

        const blog = new Blog({
            title,
            description,
            text,
            date
        });

        try {
            const newBlog = await blog.save();
            res.send(201); // All is well and something was created
            next();
        } catch(err) {
            return next(new errors.InternalError(err.message));
        }
    });

    // Update Blog
    server.put('/blogs/:id', async (req, res, next) => {
        // Check for JSON
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try {
            const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no blog with the id of ${req.params.id}`));
        }
    });

    // Delete blog
    server.del('/blogs/:id', async (req, res, next) => {
        try {
            const blog = await Blog.findOneAndRemove({ _id: req.params.id });
            res(204); // Something was successfully removed
            next();
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no blog with the id of ${req.params.id}`));
        }
    });
};
