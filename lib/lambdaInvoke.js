const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({
  endpoint: process.env.IS_OFFLINE && process.env.LAMBDA_ENDPOINT,
  region: process.env.REGION
});

const invokeLambda = async (functionName, payload) => {
  const params = {
    FunctionName: functionName,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload)
  };

  try {
    const result = await lambda.invoke(params).promise();
    return result;
  } catch (error) {
    console.error('Error invoking Lambda:', error);
    throw new Error(error);
  }
};

module.exports = invokeLambda;
