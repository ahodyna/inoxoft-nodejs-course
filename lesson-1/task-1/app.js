const fs = require('fs');
const path = require('path');
const util = require('util');

const asyncReadFile = util.promisify(fs.readFile);
const asyncRenameFile = util.promisify(fs.rename);

const girlsFolderPath = path.join(__dirname, 'girls');
const boysFolderPath = path.join(__dirname, 'boys');

function movetoBoysFolder() {
    fs.readdir(girlsFolderPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(async (fileName) => {
            const currentFilePath = path.join(girlsFolderPath, fileName);

            let result = await asyncReadFile(currentFilePath);

            const parsedFileData = JSON.parse(result.toString())
            if (parsedFileData.gender === 'male') {
                await asyncRenameFile(girlsFolderPath + '/' + fileName, boysFolderPath + '/' + fileName)
            }

        })

    })
}

function movetoGirlsFolder() {
    fs.readdir(boysFolderPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(async (fileName) => {
            const currentFilePath = path.join(boysFolderPath, fileName);

            let result = await asyncReadFile(currentFilePath);

            const parsedFileData = JSON.parse(result.toString())
            if (parsedFileData.gender === 'female') {
                await asyncRenameFile(boysFolderPath + '/' + fileName, girlsFolderPath + '/' + fileName)
            }

        })

    })
}
movetoGirlsFolder()
movetoBoysFolder()