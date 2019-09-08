require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5d103f909df5ca3a6c914c2d', { age: 22}).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 22});
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e)
// });


// async and await
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
};


updateAgeAndCount('5d103f909df5ca3a6c914c2d', 23).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});
