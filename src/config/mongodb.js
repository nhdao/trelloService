/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
const { MongoClient, ServerApiVersion } = require('mongodb')
const { env } = require('./environment')

let trelloDBInstance = null

const mongoClientInstance = new MongoClient(env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  try {
    await mongoClientInstance.connect()

    trelloDBInstance = mongoClientInstance.db(env.DB_NAME)
  } catch (err) {
    console.log(err.message)
  }
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!trelloDBInstance) {
    throw new Error('Must connect to DB first')
  }

  return trelloDBInstance
}