const { AuthenticationError, ApolloError } = require('apollo-server-lambda')
const { verifyToken } = require('./verifyToken')

const handleError = error => {
  if (error instanceof ApolloError) {
    throw error
  }

  const message = error.data && error.data.message || error.message
  const code = error.data && error.data.errorCode || error.errorCode

  throw new ApolloError(message, code, {
    errorData: error.data && error.data.data || error.data
  })
}

const validateToken = async ({ headers = {} } = {}, info = {}) => {
  if (!headers.Authorization) {
    throw new AuthenticationError('Missing authorization header')
  }

  const token = headers.Authorization.replace('Bearer ', '')

  try {
    const { success, claims } = await verifyToken(token)
    console.log(success, claims, 'This is claims')
    if (!success) {
      throw new AuthenticationError('Invalid access token')
    }
    return claims
  } catch (error) {
    handleError(error)
  }
}


const resolve = async (resolver, settings, ...args) => {
  const { isPrivate = false } = settings || {}
  const [, , context, info] = args

//   console.log(context, info)


  if (isPrivate) {
      Object.assign(context, { user: await validateToken(context, info) })
  }

  try {
    return await resolver(...args)
  } catch (error) {
    handleError(error)
  }
}

module.exports = (resolver, settings = {}) => (...args) => resolve(resolver, settings, ...args)
