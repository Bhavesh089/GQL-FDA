// src/graphql/resolvers/helloResolver.js
const helloResolver = {
    Query: {
      hello: () => {
        return "Hello, World!";
      },
    },
  };
  
  module.exports = helloResolver;
  