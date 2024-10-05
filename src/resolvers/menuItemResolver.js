const invokeLambda = require("../../lib/lambdaInvoke");
const { handleLambdaResponse } = require("../../lib/lambdaResponseHandler");
const resolve = require("../../lib/resolve");
const settings = {
    isPrivate: true
  }

const getMenuItems = async() => {
    const result = await invokeLambda(process.env.GET_MENU_ITEMS_LAMBDA_NAME, {})
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, menu_items: data.menu_items}; // Return the structured response
}

const getMenuItemsByRestaurantId = async(_,{restaurant_id}) => {
    payload = {restaurant_id}
    const result = await invokeLambda(process.env.GET_MENUITEMS_BY_RESTAURANTID_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, menu_items: data.menu_items}; // Return the structured response
}

const getMenuItemsByCatId = async(_,{category_id}) => {
    payload = {category_id}
    const result = await invokeLambda(process.env.GET_MENUITEMS_BY_CATEGORYID_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, menu_items: data.menu_items}; // Return the structured response
}

const getMenuItemsById = async(_,{id}) => {
    payload = {id}
    const result = await invokeLambda(process.env.GET_MENUITEMS_BY_ID_LAMBDA_NAME, payload)
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, menu_item: data.menu_item}; // Return the structured response
}

const createMenuItems = async(_, {menu_items}) => {
    let payload = menu_items
        try {
          const result = await invokeLambda(process.env.CREATE_MENU_ITEMS_LAMBDA_NAME, payload)
        
          console.log(result, 'this is result')
          const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log( data, 'Lambda Result');
          return {message, statusCode, data} // Return the structured response
        } catch (error) {
          console.error('Error invoking Lambda:', error);
          throw new Error(error);
        }    
  }

  const updateMenuItem = async(_, {menu_item}) => {
    // console.log(args, 'this is args-->')
    const payload = menu_item  
          console.log(payload, '-->')
  
        try {
          result = await invokeLambda(process.env.UPDATE_MENUITEMS_LAMBDA_NAME, payload)
          console.log(result, 'this is result')
          const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log( data, 'Lambda Result');
          return {statusCode, message, menu_item: data.menu_item} // Return the structured response
        } catch (error) {
          console.error('Error invoking Lambda:', error);
          throw new Error(error);
        }
      
  }
  

module.exports = {
    Query: {
        get_menu_items: resolve(getMenuItems),
        get_menu_items_by_restaurant_id: resolve(getMenuItemsByRestaurantId, settings),
        get_menu_items_by_category_id: resolve(getMenuItemsByCatId, settings),
        get_menu_item: resolve(getMenuItemsById, settings)
      },
    Mutation: {
      create_menu_items: resolve(createMenuItems, settings),
      update_menu_item: resolve(updateMenuItem, settings),
    
    }
  }
  