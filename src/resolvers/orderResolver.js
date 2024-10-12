const invokeLambda = require("../../lib/lambdaInvoke");
const { handleLambdaResponse } = require("../../lib/lambdaResponseHandler");
const resolve = require("../../lib/resolve");


const settings = {
    isPrivate: true
  }


const getOrders = async() => {
    const result = await invokeLambda(process.env.GET_ORDERS_LAMBDA_NAME, {})
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, orders: data.orders}; // Return the structured response
}

const getOrdersByRestaurantId = async(_,{restaurant_id}) => {
    payload = {restaurant_id}
    const result = await invokeLambda(process.env.GET_ORDERS_BY_RESTAURANTID_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, orders: data.orders}; // Return the structured response
}

const getOrdersByRestaurantIds = async(_,{ids}) => {
    const payload = {ids}
    console.log(payload, 'this is payload')
    const result = await invokeLambda(process.env.GET_ORDERS_BY_RESTAURANTIDS_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, orders: data.orders}; // Return the structured response
}

const getOrdersByIds = async(_,{ids}) => {
    payload = {ids}
    const result = await invokeLambda(process.env.GET_ORDERS_BY_IDS_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, orders: data.orders}; // Return the structured response
}

const getOrderByUserId = async(_,{user_id}) => {
    payload = {user_id}
    const result = await invokeLambda(process.env.GET_ORDERS_BY_USER_ID_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, orders: data.orders}; // Return the structured response
}

const getOrderById = async(_,{id}) => {
    payload = {id}
    const result = await invokeLambda(process.env.GET_ORDER_BY_ID_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, order: data.order}; // Return the structured response
}

const createOrder = async(_, {order}) => {
    let payload = order
        try {
          const result = await invokeLambda(process.env.CREATE_ORDER_LAMBDA_NAME, payload)
        
          console.log(result, 'this is result')
          const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log( data, 'Lambda Result');
          return {message, statusCode, orders: data.orders} // Return the structured response
        } catch (error) {
          console.error('Error invoking Lambda:', error);
          throw new Error(error);
        }    
  }

  const updateOrder = async(_, {order}) => {
    // console.log(args, 'this is args-->')
    const payload = order  
          console.log(payload, '-->')
  
        try {
          result = await invokeLambda(process.env.UPDATE_ORDER_LAMBDA_NAME, payload)
          console.log(result, 'this is result')
          const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log( data, 'Lambda Result');
          return {statusCode, message, order: data.order} // Return the structured response
        } catch (error) {
          console.error('Error invoking Lambda:', error);
          throw new Error(error);
        }
      
  }
  

module.exports = {
    Query: {
        get_orders_by_ids: resolve(getOrdersByIds, settings),
        get_order_by_id: resolve(getOrderById, settings),
        get_orders_by_user_id: resolve(getOrderByUserId, settings),
        get_orders_by_restaurant_id: resolve(getOrdersByRestaurantId, settings),
        get_orders_by_restaurant_ids: resolve(getOrdersByRestaurantIds, settings),
        get_orders: resolve(getOrders, settings)
      },
    Mutation: {
      create_order: resolve(createOrder, settings),
      update_order: resolve(updateOrder, settings),
    
    }
  }
  