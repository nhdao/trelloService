const joi = require('joi')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('./../utils/validators')
const { GET_DB } = require('./../config/mongodb')

// Collection definition
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = joi.object({
  title: joi.string().required().min(3).max(50).trim().strict(),
  slug: joi.string().required().min(3).trim().strict(),
  description: joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: joi.array().items(joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt: joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: joi.date().timestamp('javascript').default(null),
  _destroy: joi.boolean().default(false)
})

const createNew = async (data) => {
  try {
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)

    return createdBoard
  } catch (err) {
    throw new Error(err)
  }
}

const findOneById = async (id) => {
  try {
    const foundBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneById({
      _id: id
    })

    return foundBoard
  } catch (err) {
    throw new Error(err)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById
}