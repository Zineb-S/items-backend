const db = require('../models/db');

// Create an item
exports.createItem = (req, res) => {
    const { name, description, price } = req.body;
    const sql = 'INSERT INTO items (name, description, price) VALUES (?, ?, ?)';
    db.query(sql, [name, description, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, name, description, price });
    });
};

// Get all items
exports.getAllItems = (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get a single item
exports.getItemById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Item not found' });
        res.json(result[0]);
    });
};

// Update an item
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const sql = 'UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?';
    db.query(sql, [name, description, price, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Item updated', affectedRows: result.affectedRows });
    });
};

// Delete an item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM items WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Item deleted', affectedRows: result.affectedRows });
    });
};
