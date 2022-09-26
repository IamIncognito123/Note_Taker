const fs = require('fs');
const util = require('util');

const readNoteFile = util.promisify(fs.readFile);

const writeToNotes = (location, data) => fs.writeFile(location, JSON.stringify(data), (err) => 
err ? console.error(err): console.info(`Data was sent to ${location}`))


const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if(err){
            console.err(err)
        }else{
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToNotes(file, parseData)
        }
    })
}

module.exports = { writeToNotes, readAndAppend, readNoteFile }
