const express = require('express')
const { authenticate } = require('../middleware/authentication')
const { chats, getChats } = require('../controller/chat')
const router = express.Router()

router.post('/chat',authenticate,chats)
router.get('/getChats/:id/:groupId',authenticate,getChats)

module.exports = router


