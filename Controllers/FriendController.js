const { Friend } = require('@models/index')
const { getUserIdWithToken } = require('@libs/Helper')

exports.add = (req, res, next) => {
  const authToken = req.headers.authorization
  const userId = getUserIdWithToken(authToken)
  const friendId = req.body.newFriendId

  Friend.add(userId, friendId)
    .then(() => {
      res.status(201).json({ message: 'Amitie créé !' })
      logger.info('Friendship creation success')
    })
    .catch((error) => {
      logger.error(error)
      logger.error('Friendship creation error')
    })
}

exports.delete = (req, res, next) => {
  const authToken = req.headers.authorization
  const userId = getUserIdWithToken(authToken)
  const friendId = req.query.friendId

  Friend.delete(userId, friendId)
    .then(() => {
      res.send('suppressions OK')
      logger.info('friendship deletion success')
    })
    .catch((error) => {
      logger.error(error)
      logger.error('error during friendship deletion')
    })
}
