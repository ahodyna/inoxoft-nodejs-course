const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const util = require('util');

const asyncReadFile = util.promisify(fs.readFile);

const { PORT } = require('./configs/config');


const app = express();
const staticPath = path.join(__dirname, 'static');
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);


const dbFilePath = path.join(__dirname, '/dataBase/users.json')

const error = 'Type correct password'

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  let readFileInfo = await asyncReadFile(dbFilePath)
  let usersArray = JSON.parse(readFileInfo.toString())

  const userEmail = usersArray.find(user => user.email === email);
  const userPassword = usersArray.find(user => user.password === password);

  if (userEmail === undefined) {
    res.status(404).render('error');
    return;
  } else if (userPassword === undefined) {
    res.status(404).render('error',  {error});
    return;
  } else {

    res.render('listUsers', { usersArray });
  }
});

app.get('/users/:user_id', async (req, res) => {
  let readFileInfo = await asyncReadFile(dbFilePath);
  let usersArray = JSON.parse(readFileInfo.toString());
  const { user_id } = req.params;
  
  console.log('user_id', user_id)

  const userInfo = usersArray.find(user => user.id === user_id );


  res.render('userInfo', userInfo)
});


// 123


app.post('/create', async (req, res) => {
  const { email, password } = req.body;
  let readFileInfo = await asyncReadFile(dbFilePath);
  let usersArray = JSON.parse(readFileInfo.toString());

  const userData = { "email": email, "password": password, "id": '_' + Math.random().toString(36).substr(2, 9) };

  const userEmail = usersArray.find(user => user.email === email);

  if (userEmail) {
    res.status(404).end('This email has already been registered before ');
    return;
  } else {
    usersArray.push(userData)
    fs.writeFile(dbFilePath, JSON.stringify(usersArray), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    res.render('listUsers');
  }
});