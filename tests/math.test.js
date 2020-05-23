const { calculateTip, add, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math');

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);

    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total);
    // }
});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should convert 32 F to 0 c', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);
});

test('Should convert 0 c to 32 F', () => {
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32);
});

// *** async test ***
// if parameter is passed ('done' is passed - naming doesn't matter)
// this test case won't be considered done till 'done' is called
test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1);

        done();
    }, 2000);
});

// parameter way - less used way
test('Async - Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

// Async way - Better Way
test('Async - should add two numbers', async () => {
    const sum = await add(10, 22);

    expect(sum).toBe(32);
});
