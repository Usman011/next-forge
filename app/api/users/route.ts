import { NextRequest, NextResponse } from 'next/server'

import User from '@/database/user.model'
import handleError from '@/lib/handlers/error'
import { ValidationError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'
import { UserSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const users = await User.find()
    return NextResponse.json({ success: true, data: users }, { status: 200 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const { success, data, error } = UserSchema.safeParse(body)
    if (!success) {
      throw new ValidationError(error.flatten().fieldErrors)
    }

    const { email, username } = data
    const existingUser = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })
    if (existingUser || existingUsername) {
      throw new Error('User already exists')
    }
    const user = await User.create({
      ...data,
    })
    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse
  }
}
