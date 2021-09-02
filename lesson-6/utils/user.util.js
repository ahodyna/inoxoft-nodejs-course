const userNormalizator = (userToNormalize) => {
    const filedToRemove = ['password'];
    filedToRemove.forEach((filed) => {
        delete userToNormalize[filed];
    });

    return userToNormalize;
};

module.exports = {
    userNormalizator
};
