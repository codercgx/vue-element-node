const express=require('express')
const app=express()
app.set('secret', 'i34y12oi3u4y8')
app.use(express.json())
app.use(require('cors')())

app.use('/uploads',express.static(__dirname+'/uploads'))

require('./plugins/db')(app)
require('./routers/admin/index')(app)
require('./routers/web/index')(app)


app.listen(3000,()=>{
    console.log('http://localhost:3000')
})