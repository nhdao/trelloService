const slugify = require('./../utils/formatter')
const { boardModel } = require('./../models/boardModel')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('./../utils/apiError')
const { cloneDeep } = require('lodash')

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Làm thêm các xử lý logic khác với các Collection ...
    // Bắn email, notification ...

    const createdBoard = await boardModel.createNew(newBoard)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertId)

    // Always need to return in service
    return getNewBoard
  } catch (err) {
    throw new Error(err)
  }
}

const getDetail = async (id) => {
  try {
    const resultBoard = await boardModel.getDetail(id)

    if (!resultBoard) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    const responseBoard = cloneDeep(resultBoard)

    responseBoard.columns.forEach(column => {
      column.cards = responseBoard.cards.filter(card => {
        card.columnId.toString() === column._id.toString()
      })
    })

    delete responseBoard.cards

  } catch (err) {
    throw new Error(err)
  }
}

export const boardService = {
  createNew,
  getDetail
}