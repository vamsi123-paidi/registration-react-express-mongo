const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street1: { type: String, required: true },
  street2: { type: String },
});


const documentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  filePath: { type: String, required: true },
});

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  residentialAddress: { type: addressSchema, required: true },
  permanentAddress: { type: addressSchema },
  sameAsResidential: { type: Boolean, default: false },
  documents: { type: [documentSchema], required: true },
});

module.exports = mongoose.model('Form', formSchema);
