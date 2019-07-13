const request =  require('request')

const geocode = (adress, callback) => {
  accesToken = 'pk.eyJ1IjoiYWxkb2dybyIsImEiOiJjanhpd2hybTkxYTU3NDBvN3E5amliZW50In0.1uPArEFUaG4ua9G3oxVkYQ'

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=${accesToken}&limit=1`

  request( {url, json: true}, (error, {body}) => {
    if (error) {
      callback('No se pudo conectar con el servidor', undefined)
    } else if ( body.features.length === 0 ) {
      callback('La ciudad que buscas no se pudo encontrar. Prueba de nuevo', undefined)
    } else {
      const {place_name:nombre, center} = body.features[0]

      callback(undefined, {
        nombre,
        lat : center[0],
        long : center[1]
      })
    }
  })
}

module.exports = geocode