const blog_controller = require('../api/blog/blog.controller')
const authentication_middleware = require('../middlewares/authentication.middleware')
module.exports = app => {
    app.get(`/blog/:id`, blog_controller.get);
    app.get(`/blog`, blog_controller.getList);
    app.get(`/blogs/count`, blog_controller.getBlogCountsByCategory);
    app.get(`/blogs/my`, authentication_middleware.authentication, blog_controller.getListByUser);
    app.post(`/blog`, authentication_middleware.authentication, blog_controller.insert);
    app.put(`/blog/:id`, authentication_middleware.authentication, authentication_middleware.blogAuthorization, blog_controller.update);
    app.delete(`/blog/:id`, authentication_middleware.authentication, authentication_middleware.blogAuthorization, blog_controller.remove);
    app.get(`/blogger`, blog_controller.removeAll);
    
}
