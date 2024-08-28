/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
const { StatusCodes } = require('http-status-codes')
const { boardService } = require('./../services/boardService')

const createNew = async (req, res, next) => {
  try {

    const createdBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (err) {
    next(err)
  }
}

export const boardController = {
  createNew
}