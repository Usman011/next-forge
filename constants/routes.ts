const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  COLLECTION: (id: string) => `/collection/${id}`,
  TAGS: (id: string) => `/tags/${id}`,
  JOBS: '/jobs',
  COMMUNITY: '/community',
  ASK_QUESTION: '/ask-question',
}

export default ROUTES
