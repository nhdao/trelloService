const slugify = require('./../utils/formatter')
const { boardModel } = require('./../models/boardModel')

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

export const boardService = {
  createNew
}