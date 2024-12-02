const Form = require('../models/form');

const submitForm = async (req, res) => {
  try {
    const {
      name,
      email,
      dob,
      residentialAddress: rawResidentialAddress,
      permanentAddress: rawPermanentAddress,
      sameAsResidential,
    } = req.body;

    const residentialAddress =
      typeof rawResidentialAddress === 'string' ? JSON.parse(rawResidentialAddress) : rawResidentialAddress;

    const permanentAddress =
      typeof rawPermanentAddress === 'string' ? JSON.parse(rawPermanentAddress) : rawPermanentAddress;

    if (!name || !email || !dob) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const documents = req.files
      ? req.files.map((file) => ({
          fileName: file.originalname,
          fileType: file.mimetype,
          filePath: file.path,
        }))
      : [];

    const form = new Form({
      name,
      email,
      dob,
      residentialAddress,
      permanentAddress,
      sameAsResidential,
      documents,
    });

    await form.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({
      message: 'An error occurred while saving the form. Please try again later.',
      error: error.message, 
    });
  }
};

const getSubmittedForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the forms. Please try again later.',
      error: error.message, 
    });
  }
};

module.exports = { submitForm, getSubmittedForms };
