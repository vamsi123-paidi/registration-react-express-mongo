import React from 'react';

const DocumentUploader = ({ documents, setDocuments }) => {
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
  };

  return (
    <div>
      <label>Upload Documents:</label>
      <input type="file" multiple onChange={handleFileUpload} />
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentUploader;
