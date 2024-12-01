const db = require('../config/db');

const Product = {
  /**
   * Get products with pagination
   * @param {number} offset - Starting point of records
   * @param {number} limit - Number of records to fetch
   * @returns {Promise} List of products
   */
  getPaginated: async (offset, limit) => {
    const [rows] = await db.query(`
      SELECT 
        p.id AS ProductId, 
        p.name AS ProductName, 
        c.id AS CategoryId, 
        c.name AS CategoryName
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LIMIT ?, ?
    `, [offset, limit]);
    return rows;
  },

  /**
   * Get the total number of products
   * @returns {Promise} Total count of products
   */
  getTotalCount: async () => {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM products');
    return total;
  },

  /**
   * Create a new product
   * @param {string} name - Name of the product
   * @param {number} categoryId - ID of the category the product belongs to
   * @returns {Promise} Result of the insertion
   */
  create: async (name, categoryId) => {
    const [result] = await db.query('INSERT INTO products (name, category_id) VALUES (?, ?)', [name, categoryId]);
    return result.insertId;
  },

  /**
   * Update an existing product
   * @param {number} id - ID of the product to update
   * @param {string} name - New name for the product
   * @param {number} categoryId - ID of the category the product belongs to
   * @returns {Promise} Result of the update
   */
  update: async (id, name, categoryId) => {
    await db.query('UPDATE products SET name = ?, category_id = ? WHERE id = ?', [name, categoryId, id]);
    return { id, name, categoryId };
  },

  /**
   * Delete a product
   * @param {number} id - ID of the product to delete
   * @returns {Promise} Result of the deletion
   */
  delete: async (id) => {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
  },
};

module.exports = Product;
