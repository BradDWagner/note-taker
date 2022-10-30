//import modules
const express = require('express');
const fs = require('fs');
const uuid = require('./helpers/uuid')
const { addEntry, read, deleteEntry } = require('./helpers/fsHelp')
const path = require('path');
//store path to db.json in constant
const notesDb = './db/db.json'

const PORT = process.env.PORT || 3001

const app = express();

//add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// at /notes endpoint send notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
// respond to GET request by sending parsed json from the db
app.get('/api/notes', (req, res) => {
    read(notesDb).then((data) => res.json(JSON.parse(data)))
})
// respond to POST request by capturing data sent in request body to insert into db
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

    addEntry(newNote, notesDb)
    
    res.json('success');
    } else {
        res.json('error in posting note')
    }
})
// respond to DELETE request by passing id parameter into deleteEntry function to remove corresponding note
app.delete('/api/notes/:id', (req, res) =>{
    const id = req.params.id;
    deleteEntry(id, notesDb)
    res.send('deleted')
})
// all unlisted endpoints get sent to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
} );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);