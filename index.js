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
//console.log(process.env.USUARIO,process.env.PASSWORD,process.env.DBNAME)
const uri = `mongodb+srv://omar:omar@cluster0.b6rhxr6.mongodb.net/uts?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conectado a la bd')
}).catch(e => {
    console.log('error: ',e)
})
//importar rutas
const authRoutes=require('./routes/auth')

//ruta del middleware
app.use('/api/user', authRoutes)

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