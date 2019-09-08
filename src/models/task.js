const mongoose = require('mongoose');

// Task Model
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

module.exports = Task;
