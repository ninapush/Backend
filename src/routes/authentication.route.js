const authentication_controller = require('../api/authentication/authentication.controller')
module.exports = (app) => {
    app.post('/registration', authentication_controller.registration);
    app.get('/signOut', authentication_controller.signOut);
    app.post('/login', authentication_controller.login);
    app.get(`/checkEmail/:email`, authentication_controller.checkEmail);
}