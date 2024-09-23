const { gql } = require('apollo-server-lambda');

const UserTypeDef = gql`
  type Query {
    getUser: String
  }
`;

module.exports = UserTypeDef;
