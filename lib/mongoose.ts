import mongoose, { Mongoose } from 'mongoose'

import logger from './logger'

const MONGODB_URL = process.env.DATABASE_URL

if (!MONGODB_URL) {
  throw new Error('DATABASE_URL is not defined')
}

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info('MongoDB connection already established')
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: 'devFlow',
      })
      .then((response: Mongoose) => {
        logger.info('MongoDB connected')
        return response
      })
      .catch((error: Error) => {
        logger.error('MongoDB connection error', error)
        throw error
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
