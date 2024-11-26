const express = require('express');
const multer = require('multer');
const { submitForm, getSubmittedForms } = require('../controllers/formController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post('/submit', upload.array('documents', 5), submitForm);
router.get('/submitted', getSubmittedForms);

module.exports = router;
