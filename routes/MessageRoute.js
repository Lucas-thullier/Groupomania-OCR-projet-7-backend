const express = require('express')
const router = express.Router()
const auth = require('@middlewares/auth')
const MessageController = require('@controllers/MessageController')

router.post('/create', auth, MessageController.new)
router.get(
  '/conversationId',
  auth,
  MessageController.getAllByConversationId
)

module.exports = router
