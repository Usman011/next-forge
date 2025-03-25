export class RequestError extends Error {
  statusCode: number
  errors: Record<string, string[]>

  constructor(
    message: string,
    statusCode: number,
    errors?: Record<string, string[]>
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors || {}
    this.name = 'RequestError'
  }
}

export class ValidationError extends RequestError {
  fieldErrors: Record<string, string[]>

  constructor(fieldErrors: Record<string, string[]>) {
    const message = ValidationError.formatMessage(fieldErrors)
    super(message, 400, fieldErrors)
    this.name = 'ValidationError'
    this.fieldErrors = fieldErrors
  }

  static formatMessage(errors: Record<string, string[]>) {
    const formattedMessage = Object.entries(errors).map(([field, messages]) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1)

      if (messages[0] === 'Required') {
        return `${fieldName} is required`
      } else {
        return messages.join(' and ')
      }
    })

    return formattedMessage.join(', ')
  }
}

export class NotFoundError extends RequestError {
  constructor(resource: string) {
    super(`${resource} not found`, 404)
    this.name = 'NotFoundError'
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string = 'Forbidden') {
    super(message, 403)
    this.name = 'ForbiddenError'
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}
