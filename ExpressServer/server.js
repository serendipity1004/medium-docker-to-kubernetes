const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const axios = require('axios');
const Post = require('mongoose/Post');

const mongoUri = 'mongodb://root:root@mongodb:27017/admin';

mongoose.connect(mongoUri, {useNewUrlParser: true});

app.get('/posts', async (req, res) => {
    console.log('Getting Posts Started!!!');

    let posts = await Post.find();

    if (posts.length === 0) {
        await axios.get('http://polling_server:3000/');

        posts = await Post.find();
    }

    res.json({
        success: true,
        version:1,
        data:posts
    });

    console.log('Getting Posts Finished');
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});