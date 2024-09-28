const { ApolloServer } = require('apollo-server-lambda')
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('../typedefs')
const resolvers = require('../resolvers')

const buildContext = ({ event, context }) => ({
  headers: event.headers,
  functionName: context.functionName,
  event,
  context
})

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: buildContext
})

module.exports.process = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
})
