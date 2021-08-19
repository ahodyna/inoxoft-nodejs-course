const fs = require('fs');
const path = require('path');
const util = require('util');
const asyncRenameFile = util.promisify(fs.rename);

const folderPath = path.join(__dirname);

function moveFileToGeneralFolder(pathSearch) {
    fs.readdir(pathSearch, (err, allFilesInsideFolder) => {
        if (err) {
            console.log(err);
            return;
        }
        allFilesInsideFolder.forEach(file => {
            const currentFilePath = path.join(pathSearch, file);
            fs.stat(currentFilePath, async (err1, stats) => {
                if (err1) {
                    console.log(err1);
                    return;
                }
                if (stats.isFile()) {
                    await asyncRenameFile(currentFilePath, folderPath + '/' + file)
                }
                if (stats.isDirectory()) {
                    moveFileToGeneralFolder(currentFilePath)
                }

            })
        })
    })
}

moveFileToGeneralFolder(folderPath)