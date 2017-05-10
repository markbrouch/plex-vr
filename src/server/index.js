const Koa = require('koa')
const koaBunyanLogger = require('koa-bunyan-logger')
const Router = require('koa-router')
const serve = require('koa-static')

const req = require('request')
const { resolve } = require('path')
const { createReadStream } = require('fs')

const logger = koaBunyanLogger.bunyan.createLogger({
  name: 'server'
})

const PORT = process.env.PORT || 8000
const STATIC_DIR = resolve(__dirname, '../dist')

const app = new Koa()
const router = new Router()

router.get('/transcode', ctx => {
  const { 'x-remote-server': plexServer, ...headers } = ctx.request.headers

  ctx.body = plexServer
})

app
  .use(koaBunyanLogger({ name: 'server' }))
  .use(koaBunyanLogger.requestIdContext())
  .use(koaBunyanLogger.requestLogger())
  .use(router.routes())
  .use(serve(STATIC_DIR))

app.listen(PORT)

logger.info(`🌎 Listening on port ${PORT}`)
