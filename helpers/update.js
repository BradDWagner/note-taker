const fs = require('fs');
const { builtinModules } = require('module');

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

module.exports = {update};