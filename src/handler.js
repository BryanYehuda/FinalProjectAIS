const { nanoid } = require('nanoid');
const orders = require('./orders');

const addOrderHandler = (request, h) => {
  const {
    title,
    idUser,
    userName,
    idItem,
    itemName,
    amount,
    paymentMethod,
  } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newOrder = {
    title,
    id,
    idUser,
    userName,
    idItem,
    itemName,
    amount,
    paymentMethod,
    createdAt,
    updatedAt,
  };
  orders.push(newOrder);

  const isSuccess = orders.filter((order) => order.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Transaksi berhasil ditambahkan',
      data: {
        orderId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Transaksi gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllOrderHandler = () => ({
  status: 'success',
  data: {
    orders,
  },
});

const getOrderByIdHandler = (request, h) => {
  const { id } = request.params;

  const order = orders.filter((n) => n.id === id)[0];

  if (order !== undefined) {
    return {
      status: 'success',
      data: {
        order,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Transaksi tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteOrderByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = orders.findIndex((order) => order.id === id);

  if (index !== -1) {
    orders.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Transaksi berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Transaksi gagal dihapus. Id Order tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addOrderHandler,
  getAllOrderHandler,
  getOrderByIdHandler,
  deleteOrderByIdHandler,
};
