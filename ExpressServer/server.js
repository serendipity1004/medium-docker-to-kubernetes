const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const axios = require('axios');
const Post = require('mongoose/Post');
const redis = require('redis');
const {promisify} = require('util');

const mongoUri = 'mongodb://root:root@mongodb:27017/admin';

const client = redis.createClient({
    host:'redis'
});
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const incrAsync = promisify(client.incr).bind(client);

mongoose.connect(mongoUri, {useNewUrlParser: true});

app.get('/count', async (req, res) => {
    const count = await getAsync('count');

    console.log(count);

    res.json({
        count
    })
});

app.get('/posts', async (req, res) => {
    console.log('Getting Posts Started!!!');

    /*
    * 만일 count 라는 키가 존재하지 않으면
    * count 를 1로 세팅하고
    * count가 존재하면 +1을 합니다.
    * */
    const count = await getAsync('count');

    if(count !== 0 && !count){
        await setAsync('count', 1);
    }else{
        await incrAsync('count');
    }

    let posts = await Post.find();

    if (posts.length === 0) {
        await axios.get('http://polling_server:3000/');

        posts = await Post.find();
    }

    console.log('Getting Posts Finished');

    res.json({
        success: true,
        version:1,
        data:posts
    });

});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});