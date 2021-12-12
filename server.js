const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://yoda:star123@cluster0.bdy0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
                   {useUnifiedTopology: true})
                   .then(client => {
                       console.log('Connected to Database')
                       const db = client.db('star-wars-quotes')
                       const quotesCollection = db.collection('quotes')
                       
                       app.use(bodyParser.urlencoded({
                        extended: true
                       }))

                        app.get('/', (req, res) => {
                            db.collection('quotes').find().toArray()
                            .then(results => {
                                console.log(results);
                            })
                            .catch(error => console.error(error))
                            //res.sendFile(__dirname + '/index.html')
                        })

                       app.post('/quotes' , (req, res) => {
                        quotesCollection.insertOne(req.body)
                        .then(result => {
                            res.redirect('/')
                        })
                        .catch(error =>
                            console.error(error))
                       })

                       app.listen(3000, ()=> console.log('listening on 3000'))
                   })
                   .catch(console.error)

/*                  
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

*/


