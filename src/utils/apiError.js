class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.name = 'ApiError'
    this.status = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError