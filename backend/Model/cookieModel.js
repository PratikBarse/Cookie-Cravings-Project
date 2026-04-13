// models/cookieModel.js
const pool = require('../config/db');

const createCookie = async ({ seller_id, name, description, price, stock=0, category=null, image_url=null }) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query(
      `INSERT INTO cookies (seller_id, name, description, price, stock, category, image_url) VALUES (?,?,?,?,?,?,?)`,
      [seller_id, name, description, price, stock, category, image_url]
    );
    return { id: res.insertId };
  } finally {
    conn.release();
  }
};

const updateCookie = async (id, fields) => {
  // build set clause
  const conn = await pool.getConnection();
  try {
    const keys = Object.keys(fields);
    const vals = Object.values(fields);
    const set = keys.map(k => `${k} = ?`).join(', ');
    const [res] = await conn.query(`UPDATE cookies SET ${set} WHERE id = ?`, [...vals, id]);
    return res;
  } finally {
    conn.release();
  }
};

const deleteCookie = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query(`DELETE FROM cookies WHERE id = ?`, [id]);
    return res;
  } finally {
    conn.release();
  }
};

const findById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT c.*, u.name as seller_name, u.shop_name FROM cookies c JOIN users u ON c.seller_id = u.id WHERE c.id = ?`, [id]);
    return rows[0];
  } finally {
    conn.release();
  }
};

const listCookies = async (filters = {}) => {
  const conn = await pool.getConnection();
  try {
    let sql = `SELECT c.*, u.name as seller_name, u.shop_name FROM cookies c JOIN users u ON c.seller_id = u.id WHERE 1=1`;
    const params = [];
    if (filters.search) { sql += ` AND c.name LIKE ?`; params.push(`%${filters.search}%`); }
    if (filters.category) { sql += ` AND c.category = ?`; params.push(filters.category); }
    if (filters.minPrice) { sql += ` AND c.price >= ?`; params.push(filters.minPrice); }
    if (filters.maxPrice) { sql += ` AND c.price <= ?`; params.push(filters.maxPrice); }
    sql += ` ORDER BY c.created_at DESC`;
    const [rows] = await conn.query(sql, params);
    return rows;
  } finally {
    conn.release();
  }
};

const listBySeller = async (seller_id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM cookies WHERE seller_id = ? ORDER BY created_at DESC`, [seller_id]);
    return rows;
  } finally {
    conn.release();
  }
};

module.exports = {
  createCookie,
  updateCookie,
  deleteCookie,
  findById,
  listCookies,
  listBySeller
};
