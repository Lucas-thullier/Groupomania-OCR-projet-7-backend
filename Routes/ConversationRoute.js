const express = require('express')
const router = express.Router()
const auth = require('@middlewares/auth')
const ConversationController = require('@controllers/ConversationController')

router.get('/id', auth, ConversationController.getByIdWithUsers)
router.get('/all/userId', auth, ConversationController.getAllByUserId)

module.exports = router
