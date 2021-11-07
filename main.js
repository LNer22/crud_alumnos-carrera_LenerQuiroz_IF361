import './loadEnv.js'
import express from 'express'
import favicon from'serve-favicon'
import router from './routes/routes.js'
import session from "express-session"
import cookieParser from "cookie-parser"
import morgan from 'morgan'
import path from'path'
const __dirname = path.resolve();
const PORT = 7777
const app = express()
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
const oneDay = 24*60*60*1000
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: oneDay}
}))
app.use(cookieParser())
app.set('view engine','pug')
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})

app.use('/',router)
