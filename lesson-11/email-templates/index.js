const { WELCOME, FORGOT_PASSWORD, ADMIN_WELCOME } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome to the Book Store Family'
    },
    [FORGOT_PASSWORD]:{
        templateName: 'forgot_password',
        subject: 'Forgot Password Letter'
    },
    [ADMIN_WELCOME]:{
        templateName: 'admin_registration',
        subject: 'Welcome'
    }
}
