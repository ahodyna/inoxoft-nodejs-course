const { WELCOME } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome to the Book Store Family'
    }
}
