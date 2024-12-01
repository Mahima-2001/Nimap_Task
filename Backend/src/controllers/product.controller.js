const db = require('../config/db');

exports.getProducts = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const [products] = await db.query(`
      SELECT 
        p.id AS ProductId, 
        p.name AS ProductName, 
        c.id AS CategoryId,
        c.name AS CategoryName 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LIMIT ?, ?
    `, [parseInt(offset), parseInt(pageSize)]);

    const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM products`);
    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const result = await db.query('INSERT INTO products (name, category_id) VALUES (?, ?)', [name, categoryId]);
    res.status(201).json({ id: result[0].insertId, name, categoryId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  try {
    await db.query('UPDATE products SET name = ?, category_id = ? WHERE id = ?', [name, categoryId, id]);
    res.status(200).json({ id, name, categoryId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
