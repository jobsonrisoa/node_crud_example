const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://yoda:star123@cluster0.bdy0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
                   {useUnifiedTopology: true})
                   .then(client => {
                       console.log('Connected to Database')
                   })
                   .catch(error => console.error(error))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.listen(3000, ()=> console.log('listening on 3000'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes' , (req, res) => {
    console.log(req.body);
})




