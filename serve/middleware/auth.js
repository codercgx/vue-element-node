module.exports = option => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const User = require('../models/User')

    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')
        req.user = await User.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}