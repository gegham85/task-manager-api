const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT;

// *** register new middleware ***
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// });

// app.use(((req, res, next) => {
//     res.status(500).send('Site is currently down!');
// }));

// this will automatically parse incoming json to an object
app.use(express.json());
app.use(userRouter);

// initiate one
/*
const me = new User({
    name: 'Gegooli',
    email: 'mike@g.com',
    password: 'e3423lfsdjs'
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
});
*/

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/tasks', (req, res) => {
   Task.find().then((tasks) => {
       res.send(tasks);
   }).catch((e) => {
       res.status(500).send();
   });
});

app.get('/tasks/:taskId', (req, res) => {
    const _taskId = req.params.taskId;

    Task.findById(_taskId).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch((e) => {
        res.status(500).send();
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// *** bcrypte ***
/*
const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'Red123!';

    // number of rounds to perform; value recommended by creator
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log(isMatch);
};

myFunction();
*/

// *** json web token (JWT) ***
/*
const jwt = require('jsonwebtoken');

// json web token
const myFunction = async () => {
    // first argument: is unique identifier for the user that is being authenticated
    // second argument: a random series of characters to sign it with
    const secretString = 'thisismynewcourse';
    const token = jwt.sign({ _id: 'abc123' }, secretString, { expiresIn: '7 days' });

    console.log(token);

    const data = jwt.verify(token, secretString);
    console.log(data);
};


myFunction();
*/

// *** file upload ***
/*
const multer = require('multer');
const upload = multer({
    dest: 'images'
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});
*/
