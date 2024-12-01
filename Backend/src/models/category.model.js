const db = require('../config/db');

const Category = {
  /**
   * Get all categories
   * @returns {Promise} List of categories
   */
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  },

  /**
   * Create a new category
   * @param {string} name - Name of the category
   * @returns {Promise} Result of the insertion
   */
  create: async (name) => {
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    return result.insertId;
  },

  /**
   * Update an existing category
   * @param {number} id - ID of the category to update
   * @param {string} name - New name for the category
   * @returns {Promise} Result of the update
   */
  update: async (id, name) => {
    await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    return { id, name };
  },

  /**
   * Delete a category
   * @param {number} id - ID of the category to delete
   * @returns {Promise} Result of the deletion
   */
  delete: async (id) => {
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
  },
};

module.exports = Category;
