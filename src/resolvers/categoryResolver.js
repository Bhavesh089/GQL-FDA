const invokeLambda = require("../../lib/lambdaInvoke");
const { handleLambdaResponse } = require("../../lib/lambdaResponseHandler");
const resolve = require("../../lib/resolve");

const getCategories = async() => {
    const result = await invokeLambda(process.env.GET_CATEGORIES_LAMBDA_NAME, {})
    console.log(result, 'this is result')
    const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
    console.log(data, message, statusCode, 'Lambda Result');
    return {message, statusCode, categories: data.categories}; // Return the structured response
}





const createCategories = async(_, {categories}) => {
    let payload = categories
        try {
          const result = await invokeLambda(process.env.CREATE_CATEGORY_LAMBDA_NAME, payload)
        
          console.log(result, 'this is result')
          const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log( data, 'Lambda Result');
          return {message, statusCode, data} // Return the structured response
        } catch (error) {
          console.error('Error invoking Lambda:', error);
          throw new Error(error);
        }    
  }

  const updateCategory = async(_, {category}) => {
    // console.log(args, 'this is args-->')
    const payload = category  
          console.log(payload, '-->')
  
        try {
          result = await invokeLambda(process.env.UPDATE_CATEGORY_LAMBDA_NAME, payload)
          console.log(result, 'this is result')
          const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log( data, 'Lambda Result');
          return {statusCode, message, category: data.category} // Return the structured response
        } catch (error) {
          console.error('Error invoking Lambda:', error);
          throw new Error(error);
        }
      
  }
  

module.exports = {
    Query: {
        get_categories: resolve(getCategories)
      },
    Mutation: {
      create_categories: resolve(createCategories),
      update_category: resolve(updateCategory),
    
    }
  }
  