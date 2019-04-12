const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express()

const boxController = require('./controllers/boxController')
const fileController = require('./controllers/fileController')

routes.post('/boxes', boxController.store)

routes.post(
  '/boxes/:id/files', 
  multer(multerConfig).single('file'), 
  fileController.store
)

routes.get('/boxes/:id', boxController.show)

module.exports = routes