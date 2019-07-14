const request =  require('request')

const forecast = (long, lat, callback) => {
  const w_apikey = '5045bf7a235ece0d914d979d3be0e90b'
  const w_latitud = lat
  const w_longitud = long
  const w_lang = 'es'
  const w_units = 'si'
  const url = `https://api.darksky.net/forecast/${w_apikey}/${w_latitud},${w_longitud}?lang=${w_lang}&units=${w_units}`

  request( {url, json: true}, (error, {body}) => {
    
    if (error){
      
      callback('No se pudo conectar con el servidor', undefined)
    
    } else if( body.error ){
      
      callback('No hay pronostico para las coordenadas ingresadas...', undefined)
    
    } else {

      const{temperature:temp, summary:res, humidity:hum, apparentTemperature: st, pressure:pres} = body.currently
      callback( undefined, {
        temp,
        res,
        hum,
        st,
        pres}
      )
    }
  })
}

module.exports = forecast