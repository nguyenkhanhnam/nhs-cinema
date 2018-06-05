module.exports = {
  Code200: (object) => {
    return Object.assign({
      status: 200,
      message: 'OK: Everything is working'
    }, object)
  },

  Code201: (object) => {
    return Object.assign({
      status: 201,
      message: 'OK: New resource has been created'
    }, object)
  },

  Code204: (object) => {
    return Object.assign({
      status: 204,
      message: 'OK: The resource was successfully deleted'
    }, object)
  },

  Code304: (object) => {
    return Object.assign({
      status: 304,
      errorMessage: 'Not Modified: The client can use cached data'
    }, object)
  },

  Code400: (object) => {
    return Object.assign({
      status: 400,
      errorMessage: 'Bad Request: The request was invalid or cannot be served'
    }, object)
  },

  Code401: (object) => {
    return Object.assign({
      status: 401,
      errorMessage: 'Unauthorized: The request requires an user authentication'
    }, object)
  },

  Code403: (object) => {
    return Object.assign({
      status: 403,
      errorMessage: 'Forbidden: The server understood the request, but is refusing it or the access is not allowed'
    }, object)
  },

  Code404: (object) => {
    return Object.assign({
      status: 404,
      errorMessage: 'Not found: There is no resource behind the URI.'
    }, object)
  },

  Code409: (object) => {
    return Object.assign({
      status: 409,
      errorMessage: 'Conflict: Request conflict with current state of the server.'
    }, object)
  },

  Code422: (object) => {
    return Object.assign({
      status: 422,
      errorMessage: 'Invalid Entity – Should be used if the server cannot process the entity'
    }, object)
  },

  Code500: (object) => {
    return Object.assign({
      status: 500,
      errorMessage: 'Internal Server Error: API developers should avoid this error'
    }, object)
  },

  Code502: (object) => {
    return Object.assign({
      status: 502,
      errorMessage: 'Bad Gateway: This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response'
    }, object)
  },

  Code504: (object) => {
    return Object.assign({
      status: 504,
      errorMessage: 'Gateway Timeout: This error response is given when the server is acting as a gateway and cannot get a response in time'
    }, object)
  },

  USER_NOT_FOUND: 'User is not found',
  USER_IS_NOT_ACTIVE: 'User is not active',
  WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password',
  WRONG_PASSWORD: 'Wrong password',
  EXIST_EMAIL: 'This email has been existed',
  SIGN_IN_SUCCESS: 'Sign in successfully',
  SIGN_OUT_SUCCESS: 'Sign out successfully',
  SIGN_UP_SUCCESS: 'Sign up successfully',
  UPDATE_INFO_USER_SUCCESS: 'Update information successfully',
  AUTHENTICATE_FAIL: 'Failed to authenticate',

  MOVIE_NOT_FOUND: 'Movie not found',
  MOVIE_LIST_NOT_FOUND: 'Movie list not found',
  REMOVE_MOVIE_SUCCESS: 'Remove movie successfully',
  CREATE_MOVIE_SUCCESS: 'Create movie successfully',
  EDIT_MOVIE_SUCCESS: 'Edit movie successfully'
}
