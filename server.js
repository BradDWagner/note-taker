//import modules
const express = require('express');
const fs = require('fs');
const uuid = require('./helpers/uuid')
const { update, read, deleteEntry } = require('./helpers/fsHelp')
const path = require('path');

const notesDb = './db/db.json'

const PORT = process.env.PORT || 3001

const app = express();

//add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    read(notesDb).then((data) => res.json(JSON.parse(data)))
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

    update(newNote, notesDb)
    
    res.json('success');
    } else {
        res.json('error in posting note')
    }
})

app.delete('/api/notes/:id', (req, res) =>{
    const id = req.params.id;
    deleteEntry(id, notesDb)
    res.send('deleted')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
} );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);