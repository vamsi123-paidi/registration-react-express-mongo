require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/form', formRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
