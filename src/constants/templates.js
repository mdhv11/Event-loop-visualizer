export const TEMPLATES = [
    {
        name: "Default (Mixed)",
        code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 1000);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');`
    },
    {
        name: "Synchronous Only",
        code: `console.log('First');
console.log('Second');
console.log('Third');

function greet(name) {
  console.log('Hello ' + name);
}

greet('User');
console.log('Final');`
    },
    {
        name: "Multiple Timeouts",
        code: `console.log('Start');

setTimeout(() => {
  console.log('Timeout 1 (0ms)');
}, 0);

setTimeout(() => {
  console.log('Timeout 2 (1000ms)');
}, 1000);

console.log('End');`
    },
    {
        name: "Promise Chaining",
        code: `console.log('Start');

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  })
  .then(() => {
    console.log('Promise 2');
  });

console.log('End');`
    },
    {
        name: "Complex Nesting",
        code: `console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

console.log('6');`
    }
];
