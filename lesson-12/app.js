require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const expressFileupload = require('express-fileupload');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');

const { User } = require('./dataBase');
const userRolesEnum = require('./configs/userRoles.enum');
const { emailService, passwordService } = require('./services');
const { emailActionsEnum } = require('./configs')

const app = express();

const { DB_CONNECT_URL, PORT, ALLOWED_ORIGIN } = require('./configs/config');


async function initDatabase(mongoose) {
    const admin = await User.findOne({ role: userRolesEnum.ADMIN });

    if (admin === null) {
        const adminEmail = 'post.nodejs@protonmail.com';
        const adminPassword = Math.floor(Math.random() * 100000) + 'abcDf' + '!'
        const adminName = 'super-admin'
        const hashPassword = await passwordService.hash(adminPassword.toString());
        const admin = await User.create({ name: adminName, password: hashPassword, email: adminEmail, role: userRolesEnum.ADMIN });
        await emailService.sendMail(adminEmail, emailActionsEnum.ADMIN_WELCOME, { adminLogin: adminName, adminPassword: adminPassword })
    } 
}

mongoose.connect(DB_CONNECT_URL);
initDatabase(mongoose);


const cronJobs = require('./cron');
const swaggerJson = require('./docs/swagger.json');
const staticPath = path.join(__dirname, 'static');

app.use(cors({
    origin: _configureCors
}))
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use(expressFileupload());
app.use(helmet());

if (process.env.ENV === 'dev'){
    const morgan = require('morgan');
    app.use(morgan('dev'));
};


const { userRouter, bookRouter, authRouter, adminRouter } = require('./router');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    cronJobs();
});

function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Unknown error',
            customCode: err.customCode,
            data: err.data
        });
};


function _configureCors(origin, callback){
    const whiteList = ALLOWED_ORIGIN.split(';');

    if(!origin){
        return callback(null, true);
    }

    if(!whiteList.includes(origin)){
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
     
};
