const express = require('express')
const path = require('path')
const jsonServer = require('json-server')
const cors = require('cors')

const config = (app) => {

    app.set('views', path.join('./src', 'views'))
    app.set('view engine', 'ejs')

    app.use(express.json())
    app.use(express.urlencoded())
    app.use(express.static('public'))
    app.use(
        cors({
            origin: 'http://localhost:3000',  // Chỉ cho phép từ frontend cụ thể
            methods: ['GET', 'POST'],         // Chỉ cho phép một số phương thức
            allowedHeaders: ['Content-Type'], // Chỉ cho phép các header nhất định
            credentials: true                 // Cho phép gửi cookie
        })
    )
    app.use('/api', jsonServer.router('db.json'))
}

module.exports = config