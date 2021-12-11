const express = require('express');
const app = express();

app.listen(3333, ()=> console.log('listening on 3333'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes' , (req, res) => {
    console.log('Heloo')
})




