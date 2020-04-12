const fs = require('fs');
const path = require('path')

let sourceDirParm = process.argv[2]
// let sourceDirParm = "C:\\temp\\non-processed"
let sourceDir = fs.readdirSync(sourceDirParm, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);

let sourceDirName = sourceDirParm

const processPhoto = (filePath) => {
    let directory = path.dirname(filePath)
    let fileName = path.basename(filePath)
    let now = new Date();
    let dateTaken = now
    let dateModified = now    

    let data = fs.readFileSync(filePath);

    try {
        let parser = require('exif-parser').create(data);
        let result = parser.parse();
        console.log(result.tags.DateTimeOriginal, "UNIX Timestamp")

        if (result.tags.DateTimeOriginal != null && result.tags.DateTimeOriginal != undefined) {
            dateTaken = new Date(result.tags.DateTimeOriginal * 1000)
        }

    } catch (error) {
        console.warn(filePath + " doesn't have exif data");
    }

    let stats = fs.statSync(filePath)
    let mtime = stats.mtime
    console.log("Using mtime ", mtime)
    dateModified = new Date(mtime)

    let year = (dateTaken == now) ? dateModified.getFullYear() : dateTaken.getFullYear()
    let month = (dateTaken == now) ? ("0" + (dateModified.getMonth() + 1)).slice(-2) : ("0" + (dateTaken.getMonth() + 1)).slice(-2) 

    let dir = path.join(directory, year.toString(), month.toString())
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    fs.renameSync(filePath, path.join(dir, fileName))
}

sourceDir.forEach(fileName => {
    let sourceFilePath = path.join(sourceDirName, fileName)
    console.log(sourceFilePath)
    processPhoto(sourceFilePath)
});
