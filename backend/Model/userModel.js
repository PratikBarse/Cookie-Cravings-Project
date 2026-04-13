// models/userModel.js
const pool = require('../config/db');

const createUser = async ({ name, email, password, role='user', phone=null, shop_name=null, approved= (role==='seller' ? 0 : 1) }) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query(
      `INSERT INTO users (name,email,password,role,phone,shop_name,approved) VALUES (?,?,?,?,?,?,?)`,
      [name, email, password, role, phone, shop_name, approved]
    );
    return { id: res.insertId };
  } finally {
    conn.release();
  }
};

const findByEmail = async (email) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  } finally {
    conn.release();
  }
};

const findById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  } finally {
    conn.release();
  }
};

const getPendingSellers = async () => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT * FROM users WHERE role='seller' AND approved=0`);
    return rows;
  } finally {
    conn.release();
  }
};

const approveSeller = async (sellerId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(`UPDATE users SET approved=1 WHERE id = ? AND role='seller'`, [sellerId]);
    return true;
  } finally {
    conn.release();
  }
};

const listAllUsers = async () => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(`SELECT id, name, email, role, phone, shop_name, approved, created_at FROM users`);
    return rows;
  } finally {
    conn.release();
  }
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  getPendingSellers,
  approveSeller,
  listAllUsers
};
