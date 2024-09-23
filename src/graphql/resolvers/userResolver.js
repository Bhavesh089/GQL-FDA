const AWS = require('aws-sdk');

AWS.config.update({ logger: console });

const lambda = new AWS.Lambda({
  endpoint: process.env.LAMBDA_ENDPOINT, // Your Lambda function's local endpoint
  region: process.env.REGION // Make sure this matches your setup
});

const userResolver = {
  Query: {
    getUser:  async (_, { key }) => {
      const params = {
        FunctionName: process.env.USERS_LAMBDA_NAME,
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({'email': 'john.doe@example.com'}), // Match the payload you're sending
    };

      try {
        const result = await lambda.invoke(params).promise();
        console.log(result, 'result')
        const response = JSON.parse(result.Payload);
        const body = JSON.parse(response.body)
        return JSON.stringify(body.data[0]); // Adjust based on your response structure
      } catch (error) {
        console.error('Error invoking Lambda:', error);
        throw new Error('Could not fetch user data');
      }
    },
  },
};

module.exports = userResolver;
