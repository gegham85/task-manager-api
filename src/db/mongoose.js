const mongoose = require('mongoose');

// {connection-url}/{database-name}
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
