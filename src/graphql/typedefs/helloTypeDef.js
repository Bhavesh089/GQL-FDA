// src/graphql/typedefs/helloTypeDef.js
const { gql } = require('apollo-server-lambda');

const helloTypeDef = gql`
  type Query {
    hello: String
  }
`;

module.exports = helloTypeDef;
