const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const util = require('util');

const asyncReadFile = util.promisify(fs.readFile);

const { PORT } = require('./configs/config');

const app = express();

const staticPath = path.join(__dirname, 'static');
const dbFilePath = path.join(__dirname, '/dataBase/users.json')

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
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

app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  const readFileInfo = await asyncReadFile(dbFilePath)
  const usersArray = JSON.parse(readFileInfo.toString())

  const userFindByEmail = usersArray.find(user => user.email === email);
  const userFindByPassword = usersArray.find(user => user.password === password);

  if (userFindByEmail === undefined) {
    res.status(404).render('error', { error: 'Type correct email' });
    return;
  } else if (userFindByPassword === undefined) {
    res.status(404).render('error', { error: 'Type correct password' });
    return;
  } else {
    res.render('listUsers', { usersArray, userEmail: userFindByEmail.email });
  }
});

app.get('/users/:user_id', async (req, res) => {
  const readFileInfo = await asyncReadFile(dbFilePath);
  const usersArray = JSON.parse(readFileInfo.toString());
  const { user_id } = req.params;
  const userInfo = usersArray.find(user => user.id === user_id);
  res.render('userInfo', { userInfo })
});

app.post('/create', async (req, res) => {
  const { email, password } = req.body;
  const readFileInfo = await asyncReadFile(dbFilePath);
  const usersArray = JSON.parse(readFileInfo.toString());

  const userData = { "email": email, "password": password, "id": '_' + Math.random().toString(36).substr(2, 9) };
  const userFindByEmail = usersArray.find(user => user.email === email);

  if (userFindByEmail) {
    res.status(404).render('error', { error: 'This email has already been registered before' });
    return;
  } else {
    usersArray.push(userData)
    fs.writeFile(dbFilePath, JSON.stringify(usersArray), function (err) {
      if (err) {
        return console.log(err);
      }
    })
    res.render('listUsers', { usersArray, userEmail: userData.email })
  }
});