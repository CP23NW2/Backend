const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const model = require('./models')

model.sequelize.sync().then(() => {
    console.log('Syncing with eyeglass database!!');
}).catch((err) => {
    console.log('Failed to sync database: ' + err.message);
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express! you can testå');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running with port : ${port} !!!`);
});