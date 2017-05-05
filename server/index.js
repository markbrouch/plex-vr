const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const serve = require('koa-static')

const req = require('request')
const { resolve } = require('path')
const { createReadStream } = require('fs')

const PORT = process.env.PORT || 8000
const STATIC_DIR = resolve(__dirname, '../dist')

const app = new Koa()
const router = new Router()

router.get('/video', ctx => {
  ctx.body = req(
    'https://download.blender.org/durian/movies/Sintel.2010.720p.mkv'
  )
})

app.use(logger()).use(router.routes()).use(serve(STATIC_DIR))

app.listen(PORT)
