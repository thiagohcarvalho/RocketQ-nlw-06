const express = require('express')
const questionController = require('./controllers/question-controller')
const roomController = require('./controllers/roomController')

const route = express.Router()

route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/create-pw', (req, res) => res.render("index", {page: 'create-pw'}))

route.post('/create-room', roomController.create)
route.get('/room/:room', roomController.open)
route.post('/enter-room', roomController.enter)

route.post('/question/create/:room', questionController.create)
route.post('/question/:room/:question/:action', questionController.index)

module.exports = route