/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
const joi = require('joi')
const { StatusCodes } = require('http-status-codes')

const createNew = async (req, res, next) => {
  
  const correctCondition = joi.object({
    title: joi.string().required().min(3).max(50).trim().strict(),
    description: joi.string().required().min(3).max(256).trim().strict()

    // trim() is used to cut trailing or leading spaces
    // must be followed by strict()
  })

  try {

    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    })

    // next()

    res.status(StatusCodes.CREATED).json({
      message: 'OK'
    })
  } catch (err) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(err).message
    })
  }
}

export const boardValidation = {
  createNew
}
