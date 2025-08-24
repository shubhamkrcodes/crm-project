const express = require('express');
const auth = require('../middleware/auth');
const Record = require('../models/Record');

const router = express.Router();

// Get all records for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error('Get records error:', error);
    res.status(500).json({ message: 'Server error while fetching records' });
  }
});

// Create a new record
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    
    const newRecord = new Record({
      name,
      email,
      phone,
      status,
      user: req.user.id
    });

    const record = await newRecord.save();
    res.json(record);
  } catch (error) {
    console.error('Create record error:', error);
    res.status(500).json({ message: 'Server error while creating record' });
  }
});

// Update a record
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    
    let record = await Record.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    // Check if user owns the record
    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    record = await Record.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );
    
    res.json(record);
  } catch (error) {
    console.error('Update record error:', error);
    res.status(500).json({ message: 'Server error while updating record' });
  }
});

// Delete a record
router.delete('/:id', auth, async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    // Check if user owns the record
    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await Record.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Record removed successfully' });
  } catch (error) {
    console.error('Delete record error:', error);
    res.status(500).json({ message: 'Server error while deleting record' });
  }
});

module.exports = router;