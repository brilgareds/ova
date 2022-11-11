// const os = require('os');
const multer  = require('multer');
const express = require('express');
const Helpers = require('../common/helpers');
const OvaController = require('../controllers/ova.controller');

const ovaRouter = express.Router();
// const upload = multer({ dest: os.tmpdir() });

// upload.single('file')
ovaRouter.post('/generate', async (req, res) => {
  const data = req.body;
  // const file = req.file;

  try {
    // const { fields, files } = await Helpers.customFormidable(req);
    const { fields, files } = await Helpers.asyncFormidable({ req });
    const newUrl = await OvaController.copyOvaAndCompress(data);

    res.send(newUrl);
  } catch (e) {
    console.error(e);
    res.send(e.message);
  }
});

module.exports = ovaRouter;