const express = require('express');

const { PORT } = require('./constants');
const routes = require('./routes');

const app = express();

require('./config/hbsConfig')(app);
require('./config/expressConfig')(app);

app.use(routes);

app.listen(PORT, () => console.log(`The app is running on port ${PORT}...`));