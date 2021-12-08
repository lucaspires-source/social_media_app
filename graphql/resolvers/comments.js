const Post = require('../../models/Post')
const {UserInputError} = require('apollo-server')

module.exports = {
    Mutation : {
        async createComment(_,{postId, body}, context){
            const {username} = checkAuth(context)
            if(body.trim()=== '') {
                throw new UserInputError('Empty comment', {
                    errors:{
                        body:'Comment must not be empt'
                    }
                })
            }

            const post = Post.findById(postId)

            if(post){
                post.comments.unshif({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post;
            }else throw new UserInputError('Post not Found')
    }
}
}