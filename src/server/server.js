const express = require('express');
const app = express();
const path = require('path');

// static files from the dist folder
app.use(express.static('dist'));

// route to HTML file
app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

// export app
module.exports = app;

// start the server
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}