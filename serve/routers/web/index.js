module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const mongoose = require('mongoose')
    //const Category = mongoose.model('Category')
    // const Article = mongoose.model('Article')
    // const Hero = mongoose.model('Hero')
    router.get('/news/init', async(req,res)=>{
        res.send('ok')
    })

    app.use('/web/api', router)
}