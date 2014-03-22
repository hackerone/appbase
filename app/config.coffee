
path = require 'path'

module.exports = (app, express) ->
  
  layout = require('./components/layout')(app)
   
  app.configure "development", ->
    app.use express.logger "dev"
    app.use express.errorHandler()

  app.configure ->
    
    app.set "views", path.join __dirname, "views"
    app.set "layouts", "layouts"
    app.set "view engine", "hjs"

    app.use layout

    app.use express.json()
    app.use express.urlencoded()
    app.use express.methodOverride()
    app.use app.router
    app.use express.static path.join __dirname, "..","public"

  app.port = process.env.PORT || 3000
