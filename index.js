//Paramètres généraux
var express = require('express') //chargement module express
var fs = require('fs') //chargement module fs
const { request } = require('http')
var app = express()
var cors = require('cors')
app.use(cors({
    preflightContinue:true
}))

//lire fichier JSON
let messages = JSON.parse(fs.readFileSync('datas.json'))
let idUp = JSON.parse(fs.readFileSync('id.json'))

//lier avec postman
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.setHeader("Acces-Control-Allow-Origin","*")
    res.setHeader("Acces-Control-Allow-Headers","*")
    next()
})

app.get('/', function (req, res) {
  res.send('hello world')
})

//obtenir data
app.get('/messages', function (req, res) {
    console.log("holo")
    res.setHeader("Acces-Control-Allow-Origin","*")
    res.send(JSON.parse(fs.readFileSync('datas.json')))
})

//ajouter nouveau message
app.post('/messages', function (req, res) {
    idUp++
    req.body.id = idUp
    messages.push(req.body)
    fs.writeFileSync('datas.json',JSON.stringify(messages))
    fs.writeFileSync('id.json', JSON.stringify(idUp))//ecrase id dans le fichier json
    res.setHeader('Content-Type','application/json').send({message : 'bien'})
})

//maj requête : passer read de false à true
app.put('/messages/:id/read', function (req, res) {
    let status = 304
    messages = messages.map(m=>{
        if(m.id == req.params.id) {
            if(m.read === false){
                m.read = true
                status = 200
            }else{
                status = 304
            }
        }
        return m
    })
    fs.writeFileSync('datas.json',JSON.stringify(messages))
    res.status(status).send('le message ' + req.params.id + ' est bien lu')

})

app.delete('/messages/:id',(req,res)=>{
    messages = messages.filter(m => m.id != req.params.id)
    fs.writeFileSync('datas.json',JSON.stringify(messages)) //je mets à jour le fichier json
    res.status(200).send('le message ' + req.params.id + ' a bien été supprimé') 
    })

//pour le test unitaire, on enleve le app listen et on exporte ce fichier
module.exports = app;

//app.listen(4444)