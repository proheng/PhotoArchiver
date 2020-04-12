
let sourcePath = process.argv[2]

const fs = require("fs")
const path = require("path")
let basePath = sourcePath

const getAllFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join( dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

const result = getAllFiles(sourcePath)

console.log(result)

result.forEach(fileFullName => {
    let fileName = path.basename(fileFullName)
    console.log("From:" , fileFullName , "To:" , path.join(basePath, fileName))
    fs.renameSync(fileFullName, path.join(basePath, fileName))
});