const userNormalizator = (userToNormalize) => {
    const filedToRemove = [
        'password'
    ];

    // userToNormalize = userToNormalize.toJSON();
    // userToNormalize = userToNormalize.toObject();

    filedToRemove.forEach((filed) => {
        delete userToNormalize[filed];
    });

    return userToNormalize;
};

module.exports = {
    userNormalizator
};