//declaracion de constantes
const express = require('express')
const mongoose = require ('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

//capturar el body
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())

//conexion a la bd

//importar rutas

//ruta del middleware
app.get('/', (req, res)=> {
    res.json({
        estado: true,
        mensaje: 'FINO PAPI!!!'
    })
})

//INICIALIZAR SERVIDOR
const PORT = process.nextTick.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor Corriendo: ${PORT}`)
})