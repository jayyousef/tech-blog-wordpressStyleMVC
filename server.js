const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//set up sessions
const sess = {
  //secret used to sign the session ID cookie (string or array)
  secret: 'Super secret secret',
  cookie: {},
  //if true, forces the session to be saved back ot the session store
  resave: false,
  //if true saving login sessions
  saveUninitialized: true,
  store: new SequelizeStore({db: sequelize})
};



const hbs = exphbs.create({helpers});
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({
  force: false
}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on Port ${PORT}`));
});