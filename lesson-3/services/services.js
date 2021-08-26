const path = require('path');
const fs = require('fs');
const util = require('util');

const asyncReadFile = util.promisify(fs.readFile);
const dbFilePath = path.join(__dirname, '../dataBase/users.json');

async function readFile() {
    const readFileInfo = await asyncReadFile(dbFilePath)
    console.log("---", readFileInfo.toString())
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

        fs.writeFile(dbFilePath, JSON.stringify(arrOfUsers), function (err) {
            if (err) {
                console.log('+++++', err);
            }
        })
        return arrOfUsers;
    },

    getUserInfo: async function (userId) {
        const arrOfUsers = await readFile()
        return arrOfUsers.find(user => user.id === userId);
    },

    findUserByEmail: async function (email) {
        const arrOfUsers = await readFile()
        const userFindByEmail = arrOfUsers.find(user => user.email === email);

        return userFindByEmail
    },




}
