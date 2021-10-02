const {
  addOrderHandler,
  getAllOrderHandler,
  getOrderByIdHandler,
  deleteOrderByIdHandler,
} = require('./handler');

const routes = [{
  method: 'POST',
  path: '/order',
  handler: addOrderHandler,
},
{
  method: 'GET',
  path: '/order',
  handler: getAllOrderHandler,
},
{
  method: 'GET',
  path: '/order/{id}',
  handler: getOrderByIdHandler,
},
{
  method: 'DELETE',
  path: '/order/{id}',
  handler: deleteOrderByIdHandler,
},
];

module.exports = routes;
