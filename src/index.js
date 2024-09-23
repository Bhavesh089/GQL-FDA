require('dotenv').config();
const { ApolloServer } = require('apollo-server-lambda');
const userTypeDef = require('./graphql/typedefs/userTypeDef');
const userResolver = require('./graphql/resolvers/userResolver');

const server = new ApolloServer({
  typeDefs: [userTypeDef],
  resolvers: [userResolver],
});

exports.graphqlHandler = server.createHandler();
