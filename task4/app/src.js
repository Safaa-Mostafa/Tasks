require("dotenv").config()
require('./database/connection')

const express =require('express')
const app =express()

const path =require("path")
const staticDir = path.join(__dirname,"../public")
app.use(express.static(staticDir))
//for post method for upload files
app.use(express.urlencoded({extended:true}))

app.use(express.json())//for Api

const userRputes =require("../routes/user.api")
app.use(userRputes)

module.exports = app 