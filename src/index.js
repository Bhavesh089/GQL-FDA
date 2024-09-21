// src/index.js
const { ApolloServer } = require('apollo-server-lambda');
const helloTypeDef = require('./graphql/typedefs/helloTypeDef');
const helloResolver = require('./graphql/resolvers/helloResolver');

const server = new ApolloServer({
  typeDefs: [helloTypeDef],
  resolvers: [helloResolver],
});

exports.graphqlHandler = server.createHandler();
