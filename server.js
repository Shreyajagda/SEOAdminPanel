const express = require('express')
const port = 4252;
const path = require('path')
const app = express()
const cookie = require('cookie-parser')

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(cookie())

const db = require('./config/dataBase')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use('/', require('./route/route'))

app.listen(port, err => {
  err ? console.log(err) : console.log('Server started on port:-', port)
})
