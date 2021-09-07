const nodemailer = require('nodemailer');

const { configs } = require('../configs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configs.EMAIL_BROADCAST,
        pass: configs.EMAIL_BROADCAST_PASS
    }
});
const sendMail = (userMail) => {
    console.log('134')
    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: 'Hello world',
        html: '<h1>TEST</h1>'
    })

}

module.exports = {
    sendMail
}