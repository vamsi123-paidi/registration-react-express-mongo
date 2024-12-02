import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentUploader from './DocumentUploader';
import axios from 'axios';


const Form = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    residentialAddress: { street1: '', street2: '' },
    permanentAddress: { street1: '', street2: '' },
    sameAsResidential: false,
    documents: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddressToggle = () => {
    setForm({
      ...form,
      sameAsResidential: !form.sameAsResidential,
      permanentAddress: form.sameAsResidential
        ? { street1: '', street2: '' }
        : form.residentialAddress, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('dob', form.dob);
      formData.append(
        'residentialAddress',
        JSON.stringify(form.residentialAddress)
      );
      formData.append(
        'permanentAddress',
        JSON.stringify(form.permanentAddress)
      );
      formData.append('sameAsResidential', form.sameAsResidential);

      form.documents.forEach((doc) => formData.append('documents', doc));

      const response = await axios.post(
        'https://registration-react-express-mongo.onrender.com/api/form/submit',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      alert(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  const handleViewSubmittedData = () => {
    navigate('/submitted');
  };

  return (
    <div>
      <h1>REGISTRATION FORM</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>
            Email: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>
            Date of Birth: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>
            Residential Address: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="street1"
            placeholder="Street 1"
            value={form.residentialAddress.street1}
            onChange={(e) =>
              setForm({
                ...form,
                residentialAddress: {
                  ...form.residentialAddress,
                  street1: e.target.value,
                },
              })
            }
            required
          />
          <input
            type="text"
            name="street2"
            placeholder="Street 2"
            value={form.residentialAddress.street2}
            onChange={(e) =>
              setForm({
                ...form,
                residentialAddress: {
                  ...form.residentialAddress,
                  street2: e.target.value,
                },
              })
            }
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={form.sameAsResidential}
              onChange={handleAddressToggle}
            />
            Same as Residential Address
          </label>
        </div>

        {!form.sameAsResidential && (
          <div>
            <label>
              Permanent Address: <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="street1"
              placeholder="Street 1"
              value={form.permanentAddress.street1}
              onChange={(e) =>
                setForm({
                  ...form,
                  permanentAddress: {
                    ...form.permanentAddress,
                    street1: e.target.value,
                  },
                })
              }
              required
            />
            <input
              type="text"
              name="street2"
              placeholder="Street 2"
              value={form.permanentAddress.street2}
              onChange={(e) =>
                setForm({
                  ...form,
                  permanentAddress: {
                    ...form.permanentAddress,
                    street2: e.target.value,
                  },
                })
              }
              required
            />
          </div>
        )}

        <DocumentUploader
          documents={form.documents}
          setDocuments={(docs) => setForm({ ...form, documents: docs })}
        />

        <button type="submit">Submit</button>
      </form>

      <button
        onClick={handleViewSubmittedData}
        disabled={!isSubmitted}
        style={{
          marginTop: '10px',
          backgroundColor: isSubmitted ? 'blue' : 'grey',
          color: 'white',
          cursor: isSubmitted ? 'pointer' : 'not-allowed',
        }}
      >
        View Submitted Data
      </button>
    </div>
  );
};

export default Form;
