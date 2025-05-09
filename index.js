const express = require('express');
const cors = require('cors');
const opportunitiesRouter = require('./routes/opportunities');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/opportunities', opportunitiesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
