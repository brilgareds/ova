const express = require('express');
const OvaController = require('../controllers/ova.controller');
const ovaRouter = express.Router();

ovaRouter.post('/generate', async (req, res) => {
  const data = req.body;

  try {
    const newUrl = await OvaController.copyOvaAndCompress(data);

    res.send(newUrl);
  } catch (e) {
    console.error(e);
    res.send(e.message);
  }
});

module.exports = ovaRouter;