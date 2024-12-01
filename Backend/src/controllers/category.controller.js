const db = require('../config/db'); // Ensure your database connection is set up correctly

exports.getAllCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories');
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
    res.json({ id, name });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};




// const Category = require('../models/category.model');

// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.getAll();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch categories' });
//   }
// };

// exports.createCategory = async (req, res) => {
//   const { name } = req.body;
//   try {
//     // console.log(name)
//     if (!name) {
//       return res.status(400).json({ error: 'Category name is required' });
//     }
//     const id = await Category.create(name);
//     res.status(201).json({ id, name });
//   } catch (err) {
//     console.error('Error creating category:', err); // Log the error
//     res.status(500).json({ error: 'Failed to create category' });
//   }
// };


// exports.updateCategory = async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   try {
//     const updatedCategory = await Category.update(id, name);
//     res.json(updatedCategory);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update category' });
//   }
// };

// exports.deleteCategory = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Category.delete(id);
//     res.json({ message: 'Category deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete category' });
//   }
// };
