module.exports = {

    getRegisterPage: (req, res) => {
        res.render('register');
    },

    getLoginPage: (req, res) => {
        res.render('login');
    },
};
