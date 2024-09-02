const user_controller = require('../api/user/user.controller')
const authentication_middleware = require('../middlewares/authentication.middleware')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
  });

  const upload = multer({ storage: storage })

module.exports = app => {    
    app.get(`/me`, authentication_middleware.authentication, user_controller.get);
    app.put(`/me`, authentication_middleware.authentication,   upload.single('profilePicture'), user_controller.update);
    
}
