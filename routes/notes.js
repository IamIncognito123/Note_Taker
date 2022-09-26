const notes = require('express').Router();
const { json } = require('express');
const getId = require('../helpers/randomid')

const {writeToNotes, readAndAppend, readNoteFile} = require('../helpers/utils')

notes.get('/', (req, res) => {
    readNoteFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

})

notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: getId.randomId(),
            
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`note added successfully`)

    }else{
        res.error('error adding note')
    }

    console.log(req.body);

})

notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readNoteFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const getId = json.filter((note) => note.id === noteId);
            return getId.length > 0
                ? res.json(getId)
                : res.json(`no note with that Id`)
        })

})


notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(req.params.id)
    readNoteFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        console.log(json)
        const deleteId = json.filter((note) => note.id !== noteId)
        writeToNotes('./db/db.json', deleteId);
        // return res.json(`${noteId} was deleted`)
        return deleteId
       
      })
      

})

module.exports = notes;