
const readTypeDefs = require('../../lib/read-type-defs')
const userTypeDefs = readTypeDefs(`${__dirname}/user`)
const restaurantTypeDefs = readTypeDefs(`${__dirname}/restaurant`)
const menuItemTypeDefs = readTypeDefs(`${__dirname}/menu-items`)
const categoryTypeDefs = readTypeDefs(`${__dirname}/category`)
const orderTypeDefs = readTypeDefs(`${__dirname}/orders`)
const base = `
  type Query
  type Mutation
`

module.exports = [base, userTypeDefs, restaurantTypeDefs, menuItemTypeDefs,categoryTypeDefs, orderTypeDefs]