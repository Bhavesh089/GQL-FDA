require('dotenv').config();
const AWS = require('aws-sdk');
const { handleLambdaResponse } = require('../../lib/lambdaResponseHandler');
const resolve = require('../../lib/resolve');
const lambda = new AWS.Lambda({
  endpoint: process.env.IS_OFFLINE && process.env.LAMBDA_ENDPOINT, // Your Lambda function's local endpoint
  region: process.env.REGION // Make sure this matches your setup
});

const settings = {
  isPrivate: true
}

const userLogin = async() => {
  const params = {
            FunctionName: process.env.AUTH_LAMBDA_NAME,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(
              {
                // "user": "bhavesh",
                // "name": "bhavesh raise",
                "email": "alice@example.com",
                "mobileNumber": "1234567890",
                "role": "CUSTOMER",
              }
            ), // Match the payload you're sending
        };

        console.log(params, '-->')

      try {
        const result = await lambda.invoke(params).promise();
      
        console.log(result, 'this is result')
        const response = await handleLambdaResponse(result); // Call the utility function to handle the response
        console.log(response, 'Lambda Result');
        return JSON.stringify(response); // Return the structured response
      } catch (error) {
        console.error('Error invoking Lambda:', error);
        throw new Error('Could not fetch user data');
      }
    
}

const getUser = async() => {
  const params = {
    FunctionName: process.env.USERS_LAMBDA_NAME,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(
      {
        "user": "user#c7905301-76fe-4419-946c-9bcfa5200900",
        "Name": "bhavesh hi",
        "Email": "alice@example.com",
        "Phone": "1234567890",
        "Role": "Customer",
        "TotalEarnings": 0,
        "RegisteredRestaurants": [],
        "OrderHistory": [],
        "Favorites": [],
        "CreatedAt": "2024-09-26T12:00:00Z",
        "Address": "123 Main St",
        // "Account_status": 'inactive',
        "password": "hashedPassword1"
      }
    ), // Match the payload you're sending
};


        const result = await lambda.invoke(params).promise();
      
        console.log(result, 'this is result')
        const response = await handleLambdaResponse(result); // Call the utility function to handle the response
        console.log(response, 'Lambda Result');
        return JSON.stringify(response); // Return the structured response

}


module.exports = {
  Query: {
    user_login: resolve(
      userLogin,
    ),
    get_user: resolve(getUser, settings)
  }
}

// const AWS = require('aws-sdk');
// const { handleLambdaResponse } = require('../../lib/lambdaResponseHandler');
//  // Adjust path as necessary

// AWS.config.update({ logger: console });

// const lambda = new AWS.Lambda({
//   endpoint: process.env.IS_OFFLINE && process.env.LAMBDA_ENDPOINT, // Your Lambda function's local endpoint
//   region: process.env.REGION // Make sure this matches your setup
// });

// const authResolver = {
//   Query: {
//     auth:  async (_, id, context) => {

//     // const user = await verifyToken(context.args)
//       const params = {
//         FunctionName: process.env.AUTH_LAMBDA_NAME,
//         InvocationType: 'RequestResponse',
//         Payload: JSON.stringify(
//           {
//             // "user": "bhavesh",
//             // "name": "bhavesh raise",
//             "email": "alice@example.com",
//             "mobileNumber": "1234567890",
//             "role": "CUSTOMER",
//           }
//         ), // Match the payload you're sending
//     };

 
//       try {
//         const result = await lambda.invoke(params).promise();
      
//         console.log(result, 'this is result')
//         const response = await handleLambdaResponse(result); // Call the utility function to handle the response
//         console.log(response, 'Lambda Result');
//         return JSON.stringify(response); // Return the structured response
//       } catch (error) {
//         console.error('Error invoking Lambda:', error);
//         throw new Error('Could not fetch user data');
//       }
//     },
//   },
// };

// module.exports = authResolver;
