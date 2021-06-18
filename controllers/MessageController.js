const { Message } = require('@models/index')
const { getUserIdWithToken } = require('@libs/Helper')

exports.getAllByConversationId = (req, res, next) => {
  const conversationId = req.query.convId

  Message.getAllFor(conversationId)
    .then((messages) => {
      res.send(messages)
      logger.info('Fetching messages for conversation id success')
    })
    .catch((error) => {
      logger.error(error)
      logger.error('error during fetching messages by conversation id')
    })
}

exports.new = (req, res, next) => {
  const authToken = req.headers.authorization
  const userId = getUserIdWithToken(authToken)
  const conversationId = req.body.convId
  const messageContent = req.body.messageContent

  Message.new(userId, conversationId, messageContent)
    .then(() => {
      res.status(201).json({ message: 'creation success' })
      logger.info('new message creation success')
    })
    .catch((error) => {
      res.status(400).json({ error })
      logger.error(error)
      logger.error('new message creation failed')
    })
}
