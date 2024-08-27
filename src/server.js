/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const express = require('express')
const { CONNECT_DB, GET_DB, CLOSE_DB } = require('./config/mongodb')
const { env } = require('./config/environment')
const { APIs_V1 } = require('./routes/v1')

const START_SERVER = () => {
  const app = express()

  app.use(express.json({
    
  }))

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello client, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }`)
  })

  process.on('SIGINT', () => {
    console.log('Closing DB connection...')
    CLOSE_DB()
    console.log('Connection closed!!!')
  })
}

(async () => {
  try {
    console.log('Connecting to MongoDB cloud')
    await CONNECT_DB()
    console.log('Connected to MongoDB cloud')
    START_SERVER()
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB'))
//   .then(() => START_SERVER())
//   .catch(err => {
//     console.error(err)
//     process.exit(0)
//   })