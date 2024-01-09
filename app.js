//app.js
require('dotenv').config();

const cors = require('cors');

const sequelize = require('./sequelize'); // Adjust the path as necessary

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

const express = require('express');
const app = express();
const path = require('path');

app.use(cors());

// Serve static files from the 'media' directory
app.use('/media', express.static(path.join(__dirname, 'media')));


// Import routes
const ticketDataRoutes = require('./routes/ticketDataRoutes');
const ticketConfigRoutes = require('./routes/ticketConfigRoutes');
const checklistConfigRoutes = require('./routes/checklistConfigRoutes');
const checklistDataRoutes = require('./routes/checklistDataRoutes');
const mediaRoutes = require('./routes/mediaRoutes'); 
const solutionConfigRoutes = require('./routes/solutionConfigRoutes');
const solutionRoutes = require('./routes/solutionRoutes');
const ticketSolutionRelationRoutes = require('./routes/ticketSolutionRelationRoutes');

app.use(express.json());

// Use routes
app.use('/ticket-data', ticketDataRoutes);
app.use('/ticket-config', ticketConfigRoutes);
app.use('/checklist-config', checklistConfigRoutes);
app.use('/checklist-data', checklistDataRoutes);
app.use('/media', mediaRoutes);
app.use('/solution-config', solutionConfigRoutes);
app.use('/solution-data', solutionRoutes);
app.use('/ticket-solution/', ticketSolutionRelationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
