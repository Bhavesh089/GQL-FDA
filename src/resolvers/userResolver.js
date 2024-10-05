require('dotenv').config();
const invokeLambda = require('../../lib/lambdaInvoke');
const { handleLambdaResponse } = require('../../lib/lambdaResponseHandler');
const resolve = require('../../lib/resolve');
const settings = {
  isPrivate: true
}

const userLogin = async(_, {login_id, otp}) => {
      const payload = { login_id, otp };
      try {
        const result = await invokeLambda(process.env.VERIFY_OTP_LAMBDA_NAME, payload)
        console.log(result, 'this is result')
        const {statusCode, message, data}  = await handleLambdaResponse(result); // Call the utility function to handle the response
        console.log(data, 'Lambda Result');
        return {statusCode, message, token: data.token, user: data.user}; // Return the structured response
      } catch (error) {
        console.error('Error invoking Lambda:', error);
        throw new Error(error);
      }
    
}


const updateUser = async(_, {user}) => {
  // console.log(args, 'this is args-->')
  const payload = user  
        console.log(payload, '-->')

      try {
        result = await invokeLambda(process.env.UPDATE_USER_LAMBDA_NAME, payload)
        console.log(result, 'this is result')
        const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
        console.log( data, 'Lambda Result');
        return {statusCode, message, user: data.user} // Return the structured response
      } catch (error) {
        console.error('Error invoking Lambda:', error);
        throw new Error(error);
      }
    
}


const createUser = async(_, {user}) => {
  // console.log(args, 'this is args-->')
  const payload = [
                {
                  name: "John Doe",
                  email: "john.doe@example.com",
                  phone: "1234567890",
                  password: "password123",
                  otp: "123456",
                  role: "CUSTOMER",
                  total_earnings: 1000,
                  account_status: "ACTIVE",
                  createdAt: new Date("2023-10-01"),
                  address: "123 Main St, Cityville",
                  registered_restaurants: ["restaurant1", "restaurant2"],
                  order_history: ["order1", "order2", "order3"],
                  favorites: ["menuItem1", "menuItem2"]
                },
                {
                  name: "Jane Smith",
                  email: "jane.smith@example.com",
                  phone: "0987654321",
                  password: "pass456",
                  otp: "654321",
                  role: "VENDOR",
                  total_earnings: 5000,
                  account_status: "ACTIVE",
                  createdAt: new Date("2024-01-10"),
                  address: "456 Elm St, Townsville",
                  registered_restaurants: ["restaurant3"],
                  order_history: ["order4", "order5"],
                  favorites: ["menuItem3"]
                },
                {
                  name: "Alex Johnson",
                  email: "alex.j@example.com",
                  phone: "5555555555",
                  password: "alexpass789",
                  otp: "987654",
                  role: "ADMIN",
                  total_earnings: 200,
                  account_status: "ACTIVE",
                  createdAt: new Date("2022-11-05"),
                  address: "789 Oak St, Villagetown"
                },
                {
                  name: "Emma Wilson",
                  email: "emma.w@example.com",
                  phone: "6666666666",
                  password: "password987",
                  otp: "112233",
                  role: "CUSTOMER",
                  total_earnings: 1,
                  account_status: "ACTIVE",
                  createdAt: new Date("2023-08-15"),
                  address: "321 Maple St, Hamletville",
                  registered_restaurants: [],
                  order_history: ["order6"],
                  favorites: ["menuItem4", "menuItem5", "menuItem6"]
                },
                {
                  name: "Michael Brown",
                  email: "michael.b@example.com",
                  phone: "7777777777",
                  password: "mikepass456",
                  otp: "445566",
                  role: "VENDOR",
                  total_earnings: 10000,
                  account_status: "ACTIVE",
                  createdAt: new Date("2024-03-20"),
                  address: "654 Pine St, Metrocity",
                  registered_restaurants: ["restaurant4"],
                  order_history: ["order7", "order8"],
                  favorites: ["menuItem7", "menuItem8"]
                }
              ]  
        // console.log(params, '-->')

      try {
        result = await invokeLambda(process.env.CREATE_USER_LAMBDA_NAME, payload)
        console.log(result, 'this is result')
        const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
        console.log( data, 'Lambda Result');
        return message // Return the structured response
      } catch (error) {
        console.error('Error invoking Lambda:', error);
        throw new Error(error);
      }
    
}


const getUser = async(_,{id}) => {
      
      const payload = {id}
      // const payload = {
      //   "user": "user#c7905301-76fe-4419-946c-9bcfa5200900",
      //   "Name": "bhavesh hi",
      //   "Email": "alice@example.com",
      //   "Phone": "1234567890",
      //   "Role": "Customer",
      //   "TotalEarnings": 23,
      //   "RegisteredRestaurants": [],
      //   "OrderHistory": [],
      //   "Favorites": [],
      //   "CreatedAt": "2024-09-26T12:00:00Z",
      //   "Address": "123 Main St",
      //   // "Account_status": 'inACTIVE',
      //   "password": "hashedPassword1"
      // }
        const result = await invokeLambda(process.env.GET_USER_LAMBDA_NAME, payload)
      
        console.log(result, 'this is result')
       const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
        console.log( data, 'Lambda Result');
        return {statusCode, message, token: data.token, user: data} // Return the structured response

}

const getUsers = async() => {
  const result = await invokeLambda(process.env.GET_USERS_LAMBDA_NAME, {})
  console.log(result, 'this is result')
  const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
  console.log(data, message, statusCode, 'Lambda Result');
  return {message, statusCode, users: data.users}; // Return the structured response
}


module.exports = {
  Query: {
    get_user: resolve(getUser, settings),
    get_users: resolve(getUsers, settings),
    user_login: resolve(
      userLogin
    )
  },

  Mutation: {
    create_user: resolve(createUser, settings),
    update_user: resolve(updateUser, settings)
  }
}
