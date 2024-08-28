const joi = require('joi')
const { ObjectId } = require('mongodb')
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

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createNew = async (data) => {
  const validData = validateBeforeCreate(data)

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
    const resultBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate({
      $match: {
        _id: ObjectId.createFromHexString(id)
      },
      $lookup: {
        from: 'columns',
        localField: 'columnOrderIds',
        foreignField: '_id'
      }
    })

    // Add aggregate function if needed
    return resultBoard
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