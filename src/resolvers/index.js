const { merge } = require('lodash')
const userResolver = require('./userResolver');
const restaurantResolver = require('./restaurantResolver');


module.exports = merge(userResolver, restaurantResolver)



// require('dotenv').config();
// const { makeExecutableSchema } = require('graphql-tools')
// const { ApolloServer } = require('apollo-server-lambda');
// const AuthTypeDef = require('../graphql/typedefs/authTypeDef');
// const userTypeDef = require('../graphql/typedefs/userTypeDef');
// const authResolver = require('./authResolver');
// const userResolver = require('./userResolver');

// const typeDefs = [userTypeDef, AuthTypeDef];
// const resolvers = [userResolver, authResolver];

// const buildContext = ({ event, context }) => {
//   console.log(event)
//   return  {
//     headers: event.headers,
//     functionName: context.functionName,
//     event,
//     context
//   }
// }

// // Initialize Apollo Server with combined typeDefs and resolvers
// const server = new ApolloServer({
//   schema: makeExecutableSchema({ typeDefs, resolvers }),
//   context: buildContext
// }
// );

// exports.graphqlHandler = server.createHandler();
