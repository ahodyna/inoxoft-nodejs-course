const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const templatesInfo = require('../email-templates')

const { configs } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const statusCodesEnum = require('../configs/statusCodes.enum');


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
const sendMail = async (userMail,emailAction, userName) => {
    const templateToSend = templatesInfo[emailAction];

    if (!templateToSend) {
        throw new ErrorHandler(statusCodesEnum.SERVERE_RROR, 'Wrong template name!')
    }

    const { subject, templateName } = templateToSend

    const html = await templateParser.render(templateName, userName)

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: subject,
        html
    })

}

module.exports = {
    sendMail
}