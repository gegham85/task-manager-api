// async functions always return promise
const doWork = async () => {
    // throw new Error('something went wrong');
    return 'Geg';
};

// this will output: Promise { 'Geg' }
console.log(doWork());

doWork().then((res) => {
    console.log('result:', res);
}).catch((e) => {
    console.log('e:', e);
});

// --------------------------------------------------

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negetive');
            }

            resolve(a + b);
        }, 2000);
    });
};

const doWork2 = async () => {
    const sum = await add(2, 3);
    const sum2 = await add(sum, 5);
    const sum3 = await add(sum2, 6);

    return sum3;
};

doWork2().then((res) => {
    console.log('result:', res);
}).catch((e) => {
    console.log('e:', e);
});
