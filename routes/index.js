const express = require('express');

// routers

const notesRouter = require('./notes');

const app = express();

// ?
app.use('/notes', notesRouter)

module.exports = app;

