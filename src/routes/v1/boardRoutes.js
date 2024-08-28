/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
const express = require('express')
// const { StatusCodes } = require('http-status-codes')
const router = express.Router()
const { boardValidation } = require('./../../validations/boardValidation')
const { boardController } = require('./../../controllers/boardControllers')

router.route('/')
  .get()
  .post(boardValidation.createNew, boardController.createNew)

export const boardRoutes = router