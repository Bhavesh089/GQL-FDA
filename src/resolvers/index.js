const { merge } = require('lodash')
const userResolver = require('./userResolver');
const restaurantResolver = require('./restaurantResolver');
const menuItemResolver = require('./menuItemResolver')
const categoryResolver = require('./categoryResolver')
const orderResolver = require('./orderResolver')
module.exports = merge(userResolver, restaurantResolver, menuItemResolver, categoryResolver, orderResolver)