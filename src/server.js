const express = require('express')
const mongoose = require('mongoose') 
const path = require('path')
const cors = require('cors')

mongoose.connect('mongodb+srv://dropfiles:dropfiles@dropbox-clone-zna7q.mongodb.net/test?retryWrites=true', {
  useNewUrlParser: true,
})

const app = express()
app.use(cors()) // everybody can access 
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

app.use((req, res, next) => {
  req.io = io
  return next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // enable send files
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes'))

app.get('/', (req, res) => {
  res.send('hello word')
})

server.listen(process.env.PORT || 3000);