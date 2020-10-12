const mongoose = require('mongoose');
const Record = require('../models/Record');
const express = require('express');
const config = require('config');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/information', async (req, res) => {
  try {
    const records = await Record.find().sort({ date: -1 });
    Record.countDocuments({}, (err, value) => {
      res.status(200).json({ count: value, recent: records[0].date, api_key: config.get('api_key') });
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/getparticular/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.status(200).json(record);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
