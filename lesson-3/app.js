const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const app = express();

const { PORT } = require('./configs/config');

const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

const {authRouter, userRouter} = require('./router');

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
