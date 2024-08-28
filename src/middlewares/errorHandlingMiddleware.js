const { StatusCodes } = require('http-status-codes')
const { env } = require('./../config/environment')

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.StatusCodes],
    stack: err.stack
  }

  if (env.BUILD_MODE != 'dev') {
    delete responseError.stack
  }

  res.status(responseError.statusCode).json(responseError)
}

