import { ApolloServer } from 'apollo-server-lambda';
import helloTypeDef from './graphql/typedefs/helloTypeDef';  // Change to default import if it's an ES6 module
import helloResolver from './graphql/resolvers/helloResolver.js';  // Same here

const server = new ApolloServer({
  typeDefs: [helloTypeDef],
  resolvers: [helloResolver],
});

// Exporting the Lambda handler
export const graphqlHandler = server.createHandler();
