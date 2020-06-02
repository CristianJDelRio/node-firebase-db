const express = require('express');
const morgan = require('morgan');
const path = require('path');
const expressHandleBars = require('express-handlebars');
const routes = require('./routes');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  expressHandleBars({ defaultLayout: 'main', extname: '.hbs' })
);
app.set('view engine', '.hbs');

//MiddleWares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.use(routes);

module.exports = app;
