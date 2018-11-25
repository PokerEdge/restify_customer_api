const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        default: "Placeholder blog text"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

BlogSchema.plugin(timestamp); // Adds created_at and updated_at automatically

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;