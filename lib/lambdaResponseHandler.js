// lambdaResponseHandler.js

/**
 * Handle the response from a Lambda function invocation.
 * @param {Object} result - The result object returned from the Lambda invocation.
 * @returns {Object} The parsed and structured response.
 */
const handleLambdaResponse = (result) => {
    if (!result.Payload) {
      throw new Error('No payload received from Lambda');
    }
  
    const payload = JSON.parse(result.Payload); // Parse the payload
    console.log(payload, "this is payload");
    const response = JSON.parse(payload.body);
    if (response) {
      // Parse the body to get data
      const data = response.data;
      const statusCode = data.statusCode;
      
      if(statusCode >= 400){
              // Ensure body is properly parsed
      const body = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
      console.log(body, 'this is body');
  
      if (body.error) {
        // Handle error responses
        console.error('Error Details:', body.error); // Log the error for debugging
        return {
          statusCode: statusCode,
          data: {
            message: 'Error message',
            errorDetails: body.error, // Include detailed error information from the body
          },
        };
      }


    } else {
      console.log(response, 'this is response')
      return {
        statusCode: response.statusCode,
        data, // Include the parsed body in the response
      };
    }

  }
  
    // Fallback if body is not present
    throw new Error('Unexpected response format from Lambda');
  };
  
  module.exports = { handleLambdaResponse };
  