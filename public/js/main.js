
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
            resultado.innerHTML = `<b>${data.error}</b>`
          } else {
            resultado.innerHTML = `<b>El clima en ${data.location} es:</b>
            <b>Temperatura:</b> ${data.forecast.temp} °C,
            <b>Humedad:</b> ${data.forecast.hum * 100}%,
            <b>Resumen:</b> ${data.forecast.res}
            `
            search.value = ''
          }
        })
      })
  })