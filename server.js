const mongoose = require('mongoose');

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb+srv://Aditya:<123456#@>@cluster0.mongodb.net/finditDB';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://127.0.0.1:27017/findit', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/user', userRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
