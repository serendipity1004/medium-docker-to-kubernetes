const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const axios = require('axios');
const Post = require('mongoose/Post');

const mongoUri = 'mongodb://root:root@mongodb:27017/admin';

mongoose.connect(mongoUri, {useNewUrlParser: true});

app.get('/', async (req, res) => {
    console.log('Polling Started!!!');
    /*
    * 탑 스토리의 ID 들을 가져오는 Hacker News API 입니다.
    * */
    const result = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');

    const ids = result.data.splice(0, 10);

    const builder = [];

    /*
    * 각 ID 별로 상세 내용을 요청하여 builder
    * array에 Post의 형태로 push 해줍니다.
    * */
    for (let i = 0; i < ids.length; i++) {
        const item = ids[i];

        const {data} = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`);

        if (data.deleted) {
            continue;
        }

        builder.push({
            postId:item.id,
            type:data.type,
            title:data.title,
            text:data.text,
            url:data.url,
        });
    }

    /*
    * MongoDB에 저장하고 클라이언트에
    * OK콜을 날려줍니다.
    * */
    await Post.create(builder);

    res.json({
        success: true,
        version:1
    });

    console.log('Polling Finished');
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});