module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')

    //导入中间件模块
    const resourceMiddleware=require('../../middleware/resource')
    const authMiddleware=require('../../middleware/auth')

    const router = express.Router({
        mergeParams: true
    })
    //const Category=require('../../models/Category')

    router.post('/', async (req, res) => {
        const Model = req.Model
        const item = await Model.create(req.body)
        res.send(item)
    })

    router.get('/', async (req, res) => {
        const Model = req.Model
        const queryOptions = {}
        if (Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const item = await Model.find().setOptions(queryOptions).limit(100)
        res.send(item)
    })

    router.get('/:id', async (req, res) => {
        const Model = req.Model
        const item = await Model.findById(req.params.id)
        res.send(item)

    })

    router.put('/:id', async (req, res) => {
        const Model = req.Model
        const item = await Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(item)

    })

    router.delete('/:id', async (req, res) => {
        const Model = req.Model
        await Model.findByIdAndDelete(req.params.id)
        res.send({
            status: 'success'
        })

    })


    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(), router)


    //文件上传模块
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://127.0.0.1:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登陆校验模块
    const User = require('../../models/User')
    app.post('/admin/api/login', async (req, res) => {
        const { name, password } = req.body
        // 1.根据用户名找用户
        const user = await User.findOne({ name }).select('+password')
        assert(user, 422, '用户不存在')
        // 2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}