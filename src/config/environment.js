/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
const dotenv = require('dotenv')

dotenv.config()

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  AUTHOR: process.env.AUTHOR
}