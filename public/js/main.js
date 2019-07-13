
  const weatherForm = document.querySelector('form')
  const search = document.querySelector('input')
  const resultado = document.querySelector('#resultado')
  
  weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    
    const ciudad = location
    const url = `/weather?adress=${ciudad}`
    resultado.innerHTML = `Cargando...`
    
    fetch(url)
      .then((response) => {
        response.json()   
        .then((data) => {
          console.log(data)
          if(data.error){
            resultado.innerHTML = `${data.error}`
          } else {
            resultado.innerHTML = `El clima en ${data.location} es:
            Temperatura: ${data.forecast.temp},
            Humedad: ${data.forecast.hum},
            Resumen: ${data.forecast.res}
            `
            search.value = ''
          }
        })
      })
  })