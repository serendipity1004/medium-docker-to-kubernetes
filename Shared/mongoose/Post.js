const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    postId:{
        type:String
    },
    type:{
        type:String
    },
    title:{
        type:String
    },
    text:{
        type:String
    },
    url:{
        type:String
    },
});

const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;