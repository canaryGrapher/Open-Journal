const Record = require('../models/Record');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/make', async (req, res) => {
  try {
    console.log(req.body);
    const newRecord = new Record({
      title: req.body.title,
      imgURL: req.body.imgUrl,
      body: req.body.text
    });
    await newRecord.save();
    res.status(200).json({ msg: 'Posted successfull' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    console.log(req.body);
    const newDocument = {
      title: req.body.title,
      imgURL: req.body.imgUrl,
      body: req.body.text
    };

    Record.findOneAndUpdate(
      { _id: req.params.id },
      newDocument,
      async (err, doc) => {
        console.log(doc);
        res.status(200).json({ msg: 'Document update successfully' });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    console.log(req.params)
    const record = await Record.findById(req.params.id);
    record.remove();
    res.status(200).json({ msg: 'Post deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
