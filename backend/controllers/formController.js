const Form = require('../models/form');

const submitForm = async (req, res) => {
  try {
    const residentialAddress = JSON.parse(req.body.residentialAddress);
    const permanentAddress = JSON.parse(req.body.permanentAddress);

    const documents = req.files.map((file) => ({
      fileName: file.originalname,
      fileType: file.mimetype,
      filePath: file.path,
    }));

    const form = new Form({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      residentialAddress,
      permanentAddress,
      sameAsResidential: req.body.sameAsResidential,
      documents,
    });

    await form.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ message: 'Error saving form', error });
  }
};

const getSubmittedForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error });
  }
};

module.exports = { submitForm, getSubmittedForms };
