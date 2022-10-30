const fs = require('fs');
const util = require('util')

//add new note entry by reading file, adding new entry to file, then writing updated file
const addEntry = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(content);

            fs.writeFile(file, JSON.stringify(parsedNotes , null, 4),
            (writeErr) => writeErr ? console.error(writeErr) : console.info('Successfully updated notes'))

        }
    })
}

//create version of readFile that delivers the files as a promise
const read = util.promisify(fs.readFile)

//delete a note by reading notes, finding note with matching id, splicing it out of array, and writing file
const deleteEntry = (noteId, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            for (i = 0; i < parsedNotes.length; i++) {
                if (parsedNotes[i].id == noteId) {
                    parsedNotes.splice(i, 1)
                }
            }
            fs.writeFile(file, JSON.stringify(parsedNotes , null, 4),
            (writeErr) => writeErr ? console.error(writeErr) : console.info('Successfully updated notes'))
        }
    })
}

module.exports = {addEntry, read, deleteEntry};