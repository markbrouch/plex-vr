import Koa from 'koa'
import koaBunyanLogger from 'koa-bunyan-logger'
import Router from 'koa-router'
import rewrite from 'koa-rewrite'
import serve from 'koa-static'

import req from 'request'
import { resolve } from 'path'
import { createReadStream } from 'fs'
import qs from 'qs'

const logger = koaBunyanLogger.bunyan.createLogger({
  name: 'server'
})

const PORT = process.env.PORT || 8000
const STATIC_DIR = resolve(__dirname, '../../dist')

const app = new Koa()
const router = new Router()

router.get('/transcode', ctx => {
  const { remoteServer: plexServer, ...query } = ctx.request.query

  ctx.body = req(
    `${plexServer}/video/:/transcode/universal/start?${qs.stringify(query)}`
  )
})

app
  .use(koaBunyanLogger({ name: 'server' }))
  .use(koaBunyanLogger.requestIdContext())
  .use(koaBunyanLogger.requestLogger())
  .use(router.routes())
  .use(async (ctx, next) => {
    ctx.request.url = ctx.request.url.replace(
      /^\/(library|login|theater|servers)(\/.*)*/,
      '/'
    )
    await next()
  })
  .use(serve(STATIC_DIR))

app.listen(PORT)

logger.info(`🌎 Listening on port ${PORT}`)
