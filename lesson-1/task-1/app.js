const fs = require('fs');
const path = require('path');
const util = require('util');

const asyncReadFile = util.promisify(fs.readFile);
const asyncRenameFile = util.promisify(fs.rename);

const girlsFolderPath = path.join(__dirname, 'girls');
const boysFolderPath = path.join(__dirname, 'boys');

function movetoCorrectFolder(currentFolder, searchFolder, param){
    fs.readdir(currentFolder, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(async (fileName) => {
            const currentFilePath = path.join(currentFolder, fileName);

            let result = await asyncReadFile(currentFilePath);

            const parsedFileData = JSON.parse(result.toString())
            if (parsedFileData.gender === param) {
                await asyncRenameFile(currentFolder + '/' + fileName, searchFolder + '/' + fileName)
            }

        })

    })  
}

movetoCorrectFolder(girlsFolderPath, boysFolderPath, 'male')
movetoCorrectFolder(boysFolderPath, girlsFolderPath, 'female')