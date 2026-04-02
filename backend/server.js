require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Admin = require('./models/Admin');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/artisan', require('./routes/artisan'));

app.get('/', (req, res) => res.json({ message: 'Artisan API running' }));

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Seed default admin if none exists
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!exists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log(`Admin created: ${process.env.ADMIN_EMAIL}`);
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
