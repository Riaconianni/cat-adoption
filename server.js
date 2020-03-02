const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 3001;

const connection = require('./config/connection');

const routes = require('./routes');

//set up middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//set up and turn on routes
app.use(routes);

//connec to db
connection.connect(err => {
  if (err) {
    throw new Error(err);
  }

  app.listen(PORT, () => console.log(`Now listneing on port ${PORT}`));
});