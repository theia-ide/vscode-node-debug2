import * as app2 from './app2';

function log() {
    console.log('Hello, world!');
    test();
}
log();
setInterval(log, 3000);

function test() {
    // Test large callstack
    // var count = 0;
    // function rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890() {
    //     if (++count === 60) debugger
    //     else rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890();
    // }

    // rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890rec1234567890();

    locals();

    // set to true in the console to step into here
    let doEverything = false;
    if (doEverything) {
        app2.consoleAPIs();
        app2.throwCaught();
        app2.throwUncaught();
    }
}

function locals() {
    const veryLargeArray = [];
    for (let i = 0; i <= 5; i++) veryLargeArray[i] = Math.random();
    veryLargeArray[0] = veryLargeArray;

    let generator = function*() {
        for (let i=0; i<10; i++)
            yield i;
    };
    const gen = generator();
    const genNext = gen.next();

    const manyPropsObj: any = { prop2: 'abc', prop1: 'def' };
    for (let i=0; i<=5; i++) manyPropsObj['prop' + i] = Math.random();

    const reg = /^asdf.*$/g;
    const longStr = `this is a
string with
newlines`;
    const buffer = new ArrayBuffer(8);
    const buffView = new Int32Array(buffer);
    buffView[0] = 234;
    const s = Symbol('hi');
    const e = new Error('hi');

    const m = new Map();
    m.set('a', 1);
    m.set('bcd', [1, 2, 3]);
    m.set('def', m);
    veryLargeArray.forEach(x => m.set('k' + x, x));
    m['blah'] = 3;
    m[5] = 1;

    const set = new Set();
    set.add('blah');
    set.add([1, 2, 3]);
    set.add(set);

    let nan = NaN;
    let inf = 1/0;
    let infStr = "Infinity";
    const obj = {
        '[test]': 1,
        '.test2': 2,
        ' ': 3
    };

    debugger;
    eval('var evalVar3 = [1,2,3]');
    eval('var evalVar1 = 16');
    eval('var evalVar2 = "sdlfk"');

    const bool = true;
    const fn = () => {
        // Some fn
        const xyz = 321;
        app2.anotherFn();
        return 5;
    };
    const fn2 = function() {
        const zzz = 333;
    };

    app2.anotherFn();
    fn();

    app2.throwCaught();
    app2.throwUncaught();
}
