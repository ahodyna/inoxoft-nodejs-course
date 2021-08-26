const {
    findUserByEmail,
    createUser,
    getUserInfo,
    getAllUsers
} = require('../services/services');

module.exports = {
    getUserById: async (req, res) => {
        const { user_id } = req.params;
        const userInfo = await getUserInfo(user_id);

        res.render('userInfo', { userInfo });
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        const userFindByEmail = await findUserByEmail(email);

        if (userFindByEmail === undefined) {
            res.status(404).render('error', { error: 'Type correct email' });
        } else if (userFindByEmail.password !== password) {
            res.status(404).render('error', { error: 'Type correct password' });
        } else {
            const usersArray = await getAllUsers();
            res.render('listUsers', { usersArray, userEmail: userFindByEmail.email });
        }
    },

    registerUser: async (req, res) => {
        const { email, password } = req.body;

        const userData = {
            'email': email,
            'password': password,
            'id': '_' + Math.random().toString(36).substr(2, 9)
        };

        const userFindByEmail = await findUserByEmail(email);

        if (userFindByEmail) {
            res.status(404).render('error', { error: 'This email has already been registered before' });
        } else {
            await createUser(userData);
            const usersArray = await getAllUsers();
            res.render('listUsers', { usersArray, userEmail: userData.email });
        }
    }
};
