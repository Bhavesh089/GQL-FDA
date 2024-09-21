"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_lambda_1 = require("apollo-server-lambda");
const helloTypeDef = (0, apollo_server_lambda_1.gql) `
  type Query {
    fetchItems: [String]
  }
`;
exports.default = helloTypeDef;
