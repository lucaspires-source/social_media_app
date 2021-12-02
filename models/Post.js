const { model, Schema} = require('mongoose')


const postSchema = new Schema({
    body:String,
    username:String,
    createdAt:Date,
    comments:[
        {
            body:String,
            username:String,
            createdAt:Date,
        }    
    ],
    likes:[
        {
            username:String,
            createdAt:Date
        }
    ],
    user: {
        tyoe:Schema.Types.ObjectId,
        ref:'users'
    }
})

module.exports = model('Post', postSchema)