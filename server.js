const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 8000;

app.use(express.static('public'));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile('index.html', { root: path.join(__dirname, './public') });
});

app.listen(port, function () {
    console.log(`UI started on port ${port}`);
});