const User = require('../models/User');
const UserSession = require('../models/UserSession');
const Blog = require('../models/Blog');
const jwt = require("jwt-simple");


const authentication = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        const token = authorizationHeader.startsWith('Bearer ') ? authorizationHeader.slice(7) : authorizationHeader
        console.log(token)
        if(!token){
            return res.status(401).send({message: 'Unauthorized'});
        }
        const userSession = await UserSession.findOne({token, status: 'active'});
        if(!userSession){
            return res.status(401).send({message: 'Unauthorized'});
        }
        const user = await User.findById(userSession.userId);
        if(!user){
            return res.status(401).send({message: 'Unauthorized'});
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const blogAuthorization = async (req, res, next) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).send({message: 'blog not found'});
        }
        if(blog.userId != req.user.id){
            return res.status(401).send({message: 'Unauthorized'});
        }
        next();
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { authentication, blogAuthorization }