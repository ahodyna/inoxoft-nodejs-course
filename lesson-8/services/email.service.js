const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { configs } = require('../configs');


const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configs.EMAIL_BROADCAST,
        pass: configs.EMAIL_BROADCAST_PASS
    }
});
const sendMail = async (userMail, name) => {

    const html = await templateParser.render('welcome', { userName: name })

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: 'Welcome to the Book Store Family',
         html
    })

}

module.exports = {
    sendMail
}