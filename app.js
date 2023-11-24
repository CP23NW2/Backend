const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const port = process.env.PORT || 3000;
const route = require('./routes');
const port = 3000;
const model = require('./models')

model.sequelize.sync().then(() => {
    console.log('Syncing with eyeglass database!!');
}).catch((err) => {
    console.log('Failed to sync database: ' + err.message);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);
// Define a route
app.get('/', (request, response) => {
  res.send('Hello, Express! you can testå');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running with port : ${port} !!!`);
});