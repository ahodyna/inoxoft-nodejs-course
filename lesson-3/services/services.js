const path = require('path');
const fs = require('fs');
const util = require('util');

const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);
const dbFilePath = path.join(__dirname, '../dataBase/users.json');

async function readFile() {
    
    const readFileInfo = await asyncReadFile(dbFilePath)
    const usersArray = JSON.parse(readFileInfo.toString())

    return usersArray
}

module.exports = {

    getAllUsers: async function () {

        return await readFile()
    },

    createUser: async function (userData) {

        const arrOfUsers = await readFile()
        arrOfUsers.push(userData)

        await asyncWriteFile(dbFilePath, JSON.stringify(arrOfUsers));
    },

    getUserInfo: async function (userId) {

        const arrOfUsers = await readFile()
        return arrOfUsers.find(user => user.id === userId);
    },

    findUserByEmail: async function (email) {

        const arrOfUsers = await readFile()
        return arrOfUsers.find(user => user.email === email);

    },
}