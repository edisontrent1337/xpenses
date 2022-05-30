const {MongoClient} = require("mongodb");
const MONGO_CONNECTION_STRING = "mongodb://root:root@0.0.0.0:27017/";

const client = new MongoClient(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function (logger) {
        client.connect(function (err, db) {
            if (err || !db) {
                return logger.error(err);
            }
            dbConnection = db.db("expenses");
            logger.info("Connected to database 'expenses'.")
        });
    },
    getDb: function () {
        return dbConnection;
    },
};