let express = require('express')
let https = require('https')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

let app = express();

const loc = 'C:\\Users\\rkcst\\GDSC Project'
let temperature = "0"
let city = "0"
let min = "0"
let max = "0"


app.set('view engine','ejs')
app.set('views',loc)
app.use(express.static(loc));

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.render('index.ejs',{temperature,city,min,max})
})

app.post('/',(req,res)=>{
  const q = req.body.city
  const dt = req.body.date

  const url = 'https://api.weatherapi.com/v1/history.json?key=' + process.env.token +'&q=' + q + '&dt='+ dt
  const url_current = 'https://api.weatherapi.com/v1/current.json?key=' + process.env.token +'&q=' + q + '&aqi=no'

https.get(url_current,(response)=>{
    response.on('data', (data)=>{
      const weather = JSON.parse(data)
        temperature = weather.current.temp_c + "°C"
        city = q.charAt(0).toUpperCase() + q.slice(1)

        console.log(temperature)
        /*
        let min = weather.forcast.forecastday[0].mintemp_c + "°C"
        let max = weather.forcast.forecastday[0].maxtemp_c + "°C" */
    })
  })
})
app.listen(4000)