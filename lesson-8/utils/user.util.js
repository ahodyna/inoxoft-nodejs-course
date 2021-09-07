const userNormalizator = (userToNormalize) => {
    const filedToRemove = ['password'];
    
    userToNormalize = userToNormalize.toObject();

    filedToRemove.forEach((filed) => {
        delete userToNormalize[filed];
    });

    return userToNormalize;
};

module.exports = {
    userNormalizator
};
