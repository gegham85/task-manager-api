// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
// same as:
const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// generate new id for database store
// mongodb automatically does that if you don't specify it
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // *** CREATE ***

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Gegham',
    //     age: 34
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert user");
    //     }
    //
    //     console.log(result.ops); // array of inserted documents
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     },
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //
    //     console.log(result.ops)
    // });


    // *** READ ***
    db.collection('users').findOne({ _id: new ObjectID("5d0fea20463c082c6d6ca961") }, (error, user) => {
        if (error) {
            return console.log('unable to fetch');
        }

        console.log(user);
    });

    // find returns a cursor, a pointer to date.
    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        console.log(users);
    });

    // find returns a cursor, a pointer to date.
    db.collection('users').find({ age: 27 }).count((error, count) => {
        console.log(count);
    });


    // *** UPDATE ***
    db.collection('users').updateOne({
        _id: new ObjectID("5d0fea20463c082c6d6ca961")
    }, {
        // UPDATE OPERATORS $set, $rename,...
        $set: {
            name: 'Ghazar'
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });


    // *** DELETE ***
    db.collection('users').deleteMany({
       age: 34
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});
