const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const req = require('express/lib/request');
const { response } = require('express');

function isInArray(item) {
   var arr = [];
   if (arr.includes(item)) {
       return true;
   }
   else {
       return console.log(`This index doesn't exists`)
   }
}

function isNameRight(obj = [{name: nameExample}]) {
    if (nameExample === req.body.name) {
        return true;
    }
    else {
        return response.status(400).json("Error 400 - Bad Request")
    }
}


MongoClient.connect('mongodb+srv://yoda:star123@cluster0.bdy0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
                   {useUnifiedTopology: true})
                   .then(client => {
                       console.log('Connected to Database')
                       const db = client.db('star-wars-quotes')
                       const quotesCollection = db.collection('quotes')
                       
                        // Middlewares
                        // -----------
                       app.set('view engine', 'ejs')
                       app.use(bodyParser.urlencoded({
                        extended: true
                       }))
                       app.set('view engine', 'ejs')
                       app.use(bodyParser.json())
                       app.use(express.static('public'))

                       // Routes
                       // -----------

                        //Rota de listagem única de acordo com a posição no array de quotes.
                        app.get('/', (req, res) => {
                            db.collection('quotes').find().toArray()
                            .then(results => {
                                res.render('index.ejs', { quotes: results })
                            })
                            .catch(error => console.error(error))
                        })
                       
                       //app.set('view engine', 'ejs')
                       app.post('/quotes' , (req, res) => {
                        quotesCollection.insertOne(req.body)
                        .then(result => {
                            res.redirect('/')
                        })
                        .catch(error =>
                            console.error(error))
                       })

                        //app.set('view engine', 'ejs')
                        app.put('/quotes', (req, res) => {
                            quotesCollection.findOneAndUpdate(
                                { name: 'Yoda' },
                                {
                                  $set: {
                                    name: req.body.name,
                                    quote: req.body.quote
                                  }
                                },
                                {
                                  upsert: true
                                }
                              )
                             .then(result => {
                                res.json('Success')
                             })
                             .catch(error => console.error(error))    
                        })

                        app.delete('/quotes', (req, res) => {
                            quotesCollection.deleteOne(
                                { name: req.body.name },
                              )
                              .then(result => {
                                  if (result.deletedCount === 0) {
                                      return res.json('No quote to delete')
                                  }
                                  res.json(`Deleted Darth Vadar's quote`)
                              })
                              .catch(error => console.error(error))
                        })

                       app.listen(3000, ()=> console.log('listening on 3000'))
                   })
                   .catch(console.error)

