const express     = require('express')
const app         = express()
const path        = require('path')
const bodyParser  = require('body-parser')
const mssql       = require('mssql') // para conectar com o banco sqlserver
const cors        = require('cors')


const anuncios           = require('./routes/anuncios.route')

app.use(cors());

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded( {limit: '50mb', extended: true}));

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl} `, req.body)
  next()
})



app.use(anuncios)
app.use(express.static('public'))

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).send('404 Not Foud!' + res)
})



// Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendFile(path.join(__dirname, '../public/500.html'))
})


const PORT = process.env.PORT ||3000
app.listen(PORT, () => 
  console.info(`servidor iniciado na porta  ${PORT}`)
)
