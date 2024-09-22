const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'ap-south-1' });

const helloResolver = {
  Query: {
    hello: async () => {
      const params = {
        FunctionName: 'fda-dev-dbQuery', // Replace with actual function name
        InvocationType: 'RequestResponse',
      };

      try {
        const result = await lambda.invoke(params).promise();
        
        // First, parse the Payload as it comes back as a stringified JSON
        const payload = JSON.parse(result.Payload);
        
        // Parse the body within the payload, which is also stringified
        const body = JSON.parse(payload.body);

        return `GraphQL invoked DBQuery Lambda and got message: ${body.message}`;
      } catch (error) {
        console.error('Error invoking Lambda:', error);
        throw new Error('Error invoking the DBQuery Lambda');
      }
    },
  },
};

module.exports = helloResolver;
