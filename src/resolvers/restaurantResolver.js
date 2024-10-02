const invokeLambda = require("../../lib/lambdaInvoke");
const { handleLambdaResponse } = require("../../lib/lambdaResponseHandler");
const resolve = require("../../lib/resolve");

const create = async(_, {restaurants}) => {
    // console.log(args, 'this is args-->')
    const payload = [
        {
          "user_id": "28b99c4b-2984-44da-806b-fba73c2093b8",
          "name": "Savory Street",
          "description": "A modern fusion restaurant offering a blend of traditional and contemporary dishes.",
          "address": "12 Gourmet Lane, Flavor City, FC 12345",
          "rating": 4.8,
          "menu": [
            "Korean BBQ Tacos",
            "Truffle Parmesan Fries",
            "Spicy Tuna Rolls",
            "Matcha Cheesecake"
          ],
          "cuisine_type": "Fusion",
          "operating_hours": "Mon-Fri: 11:00 AM - 9:00 PM",
          "contact_details": "+1-555-123-4567",
          "commission_rate": 10.0,
          "total_earnings": 20000
        },
        {
          "user_id": "user002",
          "name": "Green Garden",
          "description": "A healthy, vegan-friendly restaurant that uses fresh, organic ingredients.",
          "address": "45 Fresh Blvd, Veggie Ville, VV 65432",
          "rating": 4.5,
          "menu": [
            "Quinoa Salad Bowl",
            "Vegan Burger",
            "Green Smoothie",
            "Avocado Toast"
          ],
          "cuisine_type": "Vegan",
          "operating_hours": "Mon-Sun: 9:00 AM - 8:00 PM",
          "contact_details": "+1-555-234-5678",
          "commission_rate": 8.0,
          "total_earnings": 12000
        },
        {
          "user_id": "28b99c4b-2984-44da-806b-fba73c2093b8",
          "name": "The Spice Route",
          "description": "Authentic Indian restaurant known for its spicy and flavorful dishes.",
          "address": "88 Curry Rd, Spice Town, ST 98765",
          "rating": 4.9,
          "menu": [
            "Butter Chicken",
            "Paneer Tikka",
            "Garlic Naan",
            "Mango Lassi"
          ],
          "cuisine_type": "Indian",
          "operating_hours": "Tue-Sun: 12:00 PM - 10:00 PM",
          "contact_details": "+1-555-345-6789",
          "commission_rate": 15.0,
          "total_earnings": 25000
        },
        {
          "user_id": "07deddc2-78b2-4ca1-923a-e8948e3c984d",
          "name": "Sushi World",
          "description": "A popular sushi spot offering a wide range of sushi rolls and Japanese specialties.",
          "address": "123 Sashimi St, Ocean Town, OT 78901",
          "rating": 4.6,
          "menu": [
            "California Roll",
            "Dragon Roll",
            "Salmon Sashimi",
            "Miso Soup"
          ],
          "cuisine_type": "Japanese",
          "operating_hours": "Mon-Sat: 11:30 AM - 10:30 PM",
          "contact_details": "+1-555-456-7890",
          "commission_rate": 12.0,
          "total_earnings": 18000
        },
        {
          "user_id": "07deddc2-78b2-4ca1-923a-e8948e3c984d",
          "name": "Burger Haven",
          "description": "A casual dining spot known for its gourmet burgers and hand-cut fries.",
          "address": "77 Burger Ln, Grill City, GC 12399",
          "rating": 4.3,
          "menu": [
            "Classic Cheeseburger",
            "BBQ Bacon Burger",
            "Sweet Potato Fries",
            "Milkshakes"
          ],
          "cuisine_type": "American",
          "operating_hours": "Mon-Sun: 12:00 PM - 11:00 PM",
          "contact_details": "+1-555-567-8901",
          "commission_rate": 9.0,
          "total_earnings": 22000
        }
      ]
  
        try {
          const result = await invokeLambda(process.env.CREATE_RESTAURANTS_LAMBDA_NAME, payload)
        
          console.log(result, 'this is result')
          const {statusCode, message, data} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log( data, 'Lambda Result');
          return message // Return the structured response
        } catch (error) {
          console.error('Error invoking Lambda:', error);
          throw new Error(error);
        }    
  }


  const getRestaurants = async() => {
          const result = await invokeLambda(process.env.GET_RESTAURANTS_LAMBDA_NAME, {})
          console.log(result, 'this is result')
          const {data, message, statusCode} = await handleLambdaResponse(result); // Call the utility function to handle the response
          console.log(data, message, statusCode, 'Lambda Result');
          return {message, statusCode, restaurants: data.restaurants}; // Return the structured response
  }
  

  const getRestaurant = async(_,{id}) => {
    console.log(id, 'this is id')
        const payload = {id}
        const result = await invokeLambda(process.env.GET_RESTAURANT_LAMBDA_NAME, payload)
        console.log(result, 'this is result')
        const {data, message, statusCode}  = await handleLambdaResponse(result); // Call the utility function to handle the response
        console.log(data, message, statusCode, 'Lambda Result');
        return {restaurant: data.restaurant, message, statusCode}; // Return the structured response
  }
  

  module.exports = {
    Query: {
        get_restaurants: resolve(getRestaurants),
        get_restaurant: resolve(
            getRestaurant
        )
      },
    Mutation: {
      create_restaurants: resolve(create)
    }
  }
  