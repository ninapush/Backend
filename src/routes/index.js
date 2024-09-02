
module.exports = (app) => {
  require('./blog.route')(app);
  require('./authentication.route')(app);
  require('./user.route')(app);
  app.get('/healthcheck', async (req, res)=>{
    
    return res.json({status: 'ok'})
  })
}