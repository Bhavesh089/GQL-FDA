import { gql } from 'apollo-server-lambda';

const helloTypeDef = gql`
  type Query {
    hello: String
  }
`;

export default helloTypeDef;
