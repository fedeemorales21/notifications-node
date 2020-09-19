const { Router } = require('express')
const router = Router()

const webpush = require('../push')
let data 

router.post('/sub',async (req,res) => {
    data = req.body
    res.status(200).json()

    const payload = JSON.stringify({
        title: 'A new notification',
        message: 'Hello'
    })

    await webpush.sendNotification(data,payload)
})

router.post('/custom',async (req,res) => {
    const { title, message } = req.body

    const payload = JSON.stringify({
        title,
        message 
    })

    res.status(200).json()
    await webpush.sendNotification(data, payload)
   
})

module.exports = router
