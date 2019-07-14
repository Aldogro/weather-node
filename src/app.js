const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths de toto
const appPublicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup HBS
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(appPublicPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
  res.render('index', {
    title: 'Clima',
    name: 'Aldo Rojas'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Acerca de...',
    name: 'Aldo Rojas'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    name: 'Aldo Rojas',
    title: 'Ayuda',
    text: 'Aca podes encontrar ayuda acerca de lo que quieras...'
  })
})

// weather
app.get('/weather', (req, res) => {
  if(!req.query.adress){
    return res.send({error: 'Tenés que poner alguna ciudad... no somos adivinos.'})
  }
  geocode(req.query.adress, (error, {lat, long, nombre} = {}) => {
    if(error){
      return res.send({error})
    }

    forecast(lat, long, (error, forecastData) => {
      if(error){
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location: nombre,
        adress: req.query.adress
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'Deberías darnos algo para buscar...'
    })
  }
  res.send({
    products : []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title : "Error 404 - Sitio no encontrado",
    text: 'El articulo de ayuda que buscas no esta mas',
    name: 'Aldo Rojas'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404 - Sitio no encontrado',
    text: 'la pagina que buscas ni siquiera la hicimos...',
    name: 'Aldo Rojas'
  })
})

app.listen(port, () => {
  console.log('El servidor arranco copado en el puerto ' + port)
})
