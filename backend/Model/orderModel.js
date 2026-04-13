// models/orderModel.js
const pool = require('../config/db');

const createOrder = async ({ user_id, total_amount, razorpay_order_id=null, payment_id=null, status='Pending' }) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query(`INSERT INTO orders (user_id, total_amount, razorpay_order_id, payment_id, status) VALUES (?,?,?,?,?)`,
      [user_id, total_amount, razorpay_order_id, payment_id, status]);
    return { id: res.insertId };
  } finally {
    conn.release();
  }
};

const addOrderItem = async ({ order_id, cookie_id, seller_id, quantity, price }) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query(`INSERT INTO order_items (order_id, cookie_id, seller_id, quantity, price) VALUES (?,?,?,?,?)`,
      [order_id, cookie_id, seller_id, quantity, price]);
    return res;
  } finally {
    conn.release();
  }
};

const getOrdersByUser = async (user_id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT o.*, ui.name as user_name FROM orders o JOIN users ui ON o.user_id = ui.id WHERE o.user_id = ? ORDER BY o.created_at DESC`, [user_id]);
    return rows;
  } finally {
    conn.release();
  }
};

const getAllOrders = async () => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT o.*, u.name as user_name FROM orders o JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC`);
    return rows;
  } finally {
    conn.release();
  }
};

const getOrderItems = async (order_id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT oi.*, c.name as cookie_name FROM order_items oi JOIN cookies c ON oi.cookie_id = c.id WHERE oi.order_id = ?`, [order_id]);
    return rows;
  } finally {
    conn.release();
  }
};

const updateOrderStatus = async (order_id, status) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, order_id]);
    return true;
  } finally {
    conn.release();
  }
};

module.exports = {
  createOrder,
  addOrderItem,
  getOrdersByUser,
  getAllOrders,
  getOrderItems,
  updateOrderStatus
};
