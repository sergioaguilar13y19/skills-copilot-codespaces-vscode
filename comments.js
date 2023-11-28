// Create web server
// 1. Create web server
// 2. Create database connection
// 3. Connect to database
// 4. Create schema
// 5. Create model
// 6. Create routes
// 7. Start web server
// 8. Create a comment

// Create web server
const express = require('express');
const app = express();

// Create database connection
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/firstdb', {useNewUrlParser: true, useUnifiedTopology: true});

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Create routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.send(comments);
        }
    });
});

app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.query.name,
        comment: req.query.comment
    });
    comment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Successfully added comment');
        }
    });
});

// Start web server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});