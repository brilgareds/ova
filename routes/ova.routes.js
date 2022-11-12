const express = require('express');
const Helpers = require('../common/helpers');
const OvaController = require('../controllers/ova.controller');

const ovaRouter = express.Router();

ovaRouter.post('/generate', async (req, res) => {
  try {
    const data = await Helpers.customFormidable({ req });
    const url = await OvaController.copyOvaAndCompress(data);

    res.json('something!!');
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

module.exports = ovaRouter;