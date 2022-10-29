const express = require('express');
const fs = require('fs');
const uuid = require('./helpers/uuid')
const { update } = require('./helpers/update')
const path = require('path');
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
} );

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    console.log (notes);
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

    update(newNote, './db/db.json')
    
    res.json(notes);
    } else {
        res.json('error in posting note')
    }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);