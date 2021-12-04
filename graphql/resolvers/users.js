const User = require('../../models/User.js')
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const { SECRET_KEY } = require('../../config')
module.exports = {
    Mutation : {
        async register( _ , {registerInput: {username, email, password, confirmPassword}}, context, info)
        // @TODO :Validate user Data, Make sure user does not already exist, Hash password and Create an Auth TOKEN
        {
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save()

        const token = jwt.sign({
            id:res.id,
            email: res.email,
            username: res.username
        }, SECRET_KEY, {expiresIn:'1h'})
            return {
                ...res._doc,
                id:res._id,
                token
            }
        }

    }
}