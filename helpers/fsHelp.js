const fs = require('fs');
const util = require('util')

const update = (content, file) => {
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

const read = util.promisify(fs.readFile)

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

module.exports = {update, read, deleteEntry};