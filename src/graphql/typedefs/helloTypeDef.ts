import { gql } from 'apollo-server-lambda';

const helloTypeDef = gql`
  type Query {
    fetchItems: [String]
  }
`;

export default helloTypeDef;
