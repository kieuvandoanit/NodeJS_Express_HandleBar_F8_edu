const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middleware/sortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');


//connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//Thu vien middleware de xu li code post
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());

app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//HTTP logger
app.use(morgan('combined'));


app.engine('hbs',handlebars({
  extname:'.hbs',
  helpers: require('./helpers/handlebars'),
}));
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})