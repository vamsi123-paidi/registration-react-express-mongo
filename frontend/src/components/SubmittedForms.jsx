import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../submitted.css"

const SubmittedForms = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://registration-react-express-mongo.onrender.com/api/form/submitted') 
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching forms:', error);
      });
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="submitted-forms-container">
      <h1>Submitted Forms</h1>
      <div className="form-list">
        {forms.map((form, index) => (
          <div key={index} className="form-card">
            <h3>{form.name}</h3>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Date of Birth:</strong> {new Date(form.dob).toLocaleDateString()}</p>
            <p><strong>Residential Address:</strong> {form.residentialAddress.street1}, {form.residentialAddress.street2}</p>
            <p><strong>Permanent Address:</strong> {form.permanentAddress.street1}, {form.permanentAddress.street2}</p>
            
            <div className="documents">
              <strong>Documents:</strong>
              <ul>
                {form.documents.map((doc, i) => (
                  <li key={i}>
                    <a href={`http://localhost:5000/${doc.filePath}`} target="_blank" rel="noreferrer">
                      {doc.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <button
        onClick={handleGoBack}
        className="back-button"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default SubmittedForms;
