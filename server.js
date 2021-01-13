const express = require('express')
const app = express();
const port = 3000

const {MongoClient, ObjectId} = require('mongodb');
var url = "mongodb://localhost:27017";

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
 });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static('static'))


app.get('/webresources/players', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("basketball");
            var collection = opaDB.collection("players");  
            opaDB.collection("players").find({}).toArray(function(err, result) {
                db.close();
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.send(result);
                }
            });
        }
    });
})

app.get('/webresources/players/:id', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("basketball");
            var collection = opaDB.collection("players"); 
            idObj = new ObjectId(req.params.id) 
            collection.findOne({_id : idObj}, function(err, result) {
                db.close();
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.send(result);
                }
            });
        }
    });
})


app.post('/webresources/players', (req, res) => {
    data = {
        name: req.body.name,
        surname: req.body.surname,
        rodzaj: req.body.position,
        clubs: typeof(req.body.clubs) === 'string' ? req.body.clubs.split(",") : req.body.clubs
    }
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("basketball");
            var collection = opaDB.collection("players");    
            collection.insertOne(data, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send(result);
                }
            });
        }
    });
})

app.post('/webresources/update/:id', (req, res) => {
    var newValues = {$set:{
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        position: req.body.position,
        clubs: typeof(req.body.clubs) === 'string' ? req.body.clubs.split(",") : req.body.clubs
    }};
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("basketball");
            var collection = opaDB.collection("players");  
            idObj = new ObjectId(req.params.id)  
            collection.updateOne({_id: idObj}, newValues, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send(result);
                }
            });
        }
    });
})

app.post('/webresources/delete', (req, res) => {

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("basketball");
            var collection = opaDB.collection("players");    
            collection.deleteOne({_id: ObjectId(req.body.id)}, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send(result);
                }
            });
        }
    });
})
//koniec

app.listen(port, () => {
    console.log(`Example app listening at ` + 
                `http://localhost:${port}`   );
  })
