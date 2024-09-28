const { gql } = require('apollo-server-lambda');

const UsertypeDef = gql`
  type Query {
    get_user: String
    user_login: String
  }
`;

module.exports = UsertypeDef;
