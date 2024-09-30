const express = require('express');
const compression = require('compression');
const app = express();

// Use compression middleware
app.use(compression({ level: 6 }));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 

