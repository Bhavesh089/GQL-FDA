
const readTypeDefs = require('../../lib/read-type-defs')
const userTypeDefs = readTypeDefs(`${__dirname}/user`)
const restaurantTypeDefs = readTypeDefs(`${__dirname}/restaurant`)
const base = `
  type Query
  type Mutation
`

module.exports = [base, userTypeDefs, restaurantTypeDefs]