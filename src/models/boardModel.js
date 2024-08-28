const joi = require('joi')
const { ObjectId } = require('mongodb')
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('./../utils/validators')
const { GET_DB } = require('./../config/mongodb')
const { BOARD_TYPES } = require('./../utils/constants')
const { columnModel } = require('./columnModel')
const { cardModel } = require('./cardModel')

// Collection definition
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = joi.object({
  title: joi.string().required().min(3).max(50).trim().strict(),
  slug: joi.string().required().min(3).trim().strict(),
  description: joi.string().required().min(3).max(256).trim().strict(),
  type: joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
  columnOrderIds: joi.array().items(joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt: joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: joi.date().timestamp('javascript').default(null),
  _destroy: joi.boolean().default(false)
})

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  try {
    const validData = validateBeforeCreate(data)
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)

    return createdBoard
  } catch (err) {
    throw new Error(err)
  }
}

const findOneById = async (id) => {
  try {
    const foundBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: ObjectId.createFromHexString(id)
    })

    return foundBoard
  } catch (err) {
    throw new Error(err)
  }
}

const getDetail = async (id) => {
  try {
    const resultBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(id),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: columnModel.COLUMN_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns  '
        }
      },
      {
        $lookup: {
          from: cardModel.CARD_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards  '
        }
      },
      {
        $project: {
          _id: 0,
          title: 1,
          description: 1,
          type: 1,
          columns: 1,
          cards: 1
        }
      }
    ]).toArray()

    return resultBoard[0] || {}
  } catch (err) {
    throw new Error(err)
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetail
}