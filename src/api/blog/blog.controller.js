const Blog = require('../../models/Blog');
const get = async (req, res) => {
    try {
        const {id} = req.params;
        const blogs = await Blog.findById(id);
        res.send(blogs);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getList = async (req, res) => {
    try {
        const {category} = req.query;
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        let blogs = []
        let totalBlogs = 0
        if(category){
            blogs =  await Blog.find({status: "Published", category: category}).populate('userId', 'fullName profileImage').sort({createdAt: -1}).skip(skip).limit(limit).exec();
            totalBlogs = await Blog.countDocuments({status: "Published", category: category});
        } else {
            blogs =  await Blog.find({status: "Published"}).populate('userId', 'fullName profileImage').sort({createdAt: -1}).skip(skip).limit(limit).exec();
            totalBlogs = await Blog.countDocuments({status: "Published"});
        }
         
        const totalPages = Math.ceil(totalBlogs / limit);
        const pagination = {currentPage: page, totalPages, totalBlogs}
        res.send({blogs, pagination});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
const getListByUser = async (req, res) => {
    try {
        const userId = req.user._id
        const blogs = await Blog.find({userId}).populate('userId').exec();
        res.send(blogs);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const insert = async (req, res) => {
    try {
        const blog = new Blog({
            userId: req.user.id,
            author: req.user.fullName,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            status: req.body.status
        });
        const newBlog = await blog.save();
        res.send(newBlog);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, content, category, status} = req.body;
        
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            userId: req.user.id,
            author: req.user.fullName,
            title,
            content,
            category,
            status
        });
        res.send(updatedBlog);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Blog.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const removeAll = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Blog.deleteMany();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
const getBlogCountsByCategory = async (req, res) => {
    try {
      const blogCounts = await Blog.aggregate([
        {
          $match: { status: 'Published' }, 
        },
        {
          $group: {
            _id: '$category', 
            count: { $sum: 1 }, 
          },
        },
        {
          $sort: { count: -1 }, 
        },
      ]);
      res.send(blogCounts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog counts: ' + error.message });
    }
  };
module.exports = {
    get, getList, insert, update, remove, getListByUser, removeAll, getBlogCountsByCategory
}