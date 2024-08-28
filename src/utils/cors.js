/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const ApiError = require('./apiError')
const { WHITELIST_DOMAIN } = require('./constants')
const { env } = require('./../config/environment')
const { StatusCodes } = require('http-status-codes')

export const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || env.BUILD_MODE === 'dev') {
      callback(null, true) // allow origin
    }

    if (WHITELIST_DOMAIN.includes(origin)) {
      callback(null, true)
    }

    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} is not allowed by CORS policy`))
  },
  optionSuccessStatus: 200,
  credentials: true // This allows CORS to receive cookies from request
}
