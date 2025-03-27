interface Tag {
  _id: string
  name: string
}

interface Author {
  _id: string
  name: string
  image: string
}

interface Question {
  _id: string
  title: string
  tags: Tag[]
  author: Author
  createdAt: Date
  upvotes: number
  views: number
  answers: number
}

interface ActionResponse<T = null> {
  success: boolean
  data?: T
  status?: number
  error?: {
    message: string
    details?: Record<string, string[]>
  }
}

type SuccessResponse<T = null> = ActionResponse<T> & { success: true }
type ErrorResponse = ActionResponse & { success: false }

type APIErrorResponse = NextResponse<ErrorResponse>
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>
