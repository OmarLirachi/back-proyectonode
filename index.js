// Declaracion de Constantes
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

// Capturar el body
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())

// Conexion a la Base de Datos
// console.log(process.env.USERNAME, process.env.PASSWORD,process.env.DBNAME)

const uri = `mongodb+srv://omar:omar@cluster0.b6rhxr6.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a BD')
}).catch(e => {
    console.log('error: ', e)
})


// Importar Rutas
const authRoutes = require('./routes/auth')

// Ruta del Middleware
app.use('/api/user', authRoutes)

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'WORKS FINE!!!'
    })
})

// Inicializar servidor
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Servidor Corriendo: ${PORT}`)
})