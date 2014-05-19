module.exports = (app) ->
  app.get '/', (req, res, next) ->
    res.render 'site/index',
      "items": [0,1,2],
      "featured": [0,1]

  app.get '/listing', (req, res, next) ->
    res.render 'site/listing'

  app.get '/dashboard', (req, res, next) ->
    res.render 'site/dashboard'
