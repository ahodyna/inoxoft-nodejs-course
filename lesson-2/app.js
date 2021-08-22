const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./configs/config');
const users = require('./dataBase/users');

const app = express();
const staticPath = path.join(__dirname, 'static');
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.get('/login', (req, res) => {
    res.render('login')
  })

  app.get('/register', (req, res) => {
    res.render('register')
  })


  app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    const userEmail = users.find(user => user.email === email);
    const userPassword = users.find(user => user.password === password);

    if (!userEmail) {
        res.status(404).end('User not found');
        return;
    }

    if (!userPassword) {
      res.status(404).end('Type correct password');
      return;
  }

    res.render('listUsers');
});
