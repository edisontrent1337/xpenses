const express = require('express');
const morgan = require('morgan');
const logger = require('./config/winston');
const app = express();
const db = require('./db/connection');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('combined', {stream: logger.stream}));

db.connectToServer(logger);

app.post('/expenses', (req, res) => {
    console.log(req.body);
    db.getDb()
        .collection("expenses")
        .insertOne(req.body)
        .then(result => res.json(result))
        .catch(error => logger.error(error));
});



app.get('/expenses', (req, res) => {
    db.getDb()
        .collection("expenses")
        .find({}).toArray((err, result) => {
        if (err) {
            res.status(500).send("Error retrieving expenses!")
        }
        logger.info(result);
        res.json(result);
    });
});

app.listen(3000, () => {
    logger.info('Started Xpenses. Listening on 3000');
});