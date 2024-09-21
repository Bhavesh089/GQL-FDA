"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlHandler = void 0;
const apollo_server_lambda_1 = require("apollo-server-lambda");
const helloTypeDef_1 = __importDefault(require("./graphql/typedefs/helloTypeDef")); // Change to default import if it's an ES6 module
const helloResolver_js_1 = __importDefault(require("./graphql/resolvers/helloResolver.js")); // Same here
const server = new apollo_server_lambda_1.ApolloServer({
    typeDefs: [helloTypeDef_1.default],
    resolvers: [helloResolver_js_1.default],
});
// Exporting the Lambda handler
exports.graphqlHandler = server.createHandler();
