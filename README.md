[![npm](https://img.shields.io/npm/v/mimic-it.svg?maxAge=3600)](https://www.npmjs.com/package/mimic-it)

## Versioning

This project follows [semantic versioning](http://semver.org/).

## Install

The ES6 version of mimic is hosted on NPM as 'mimic-it'.

There is no ES5 version at the moment - please just use babel or similar in your toolchain, with regenerator, if you need to run this on an older environment.

`npm i -S mimic-it`

or

`yarn add mimic-it`

## Usage

```
// create a replayable iterator
const it = mimic(gen)

// same but specifying first steps
const it = mimic(gen, [{ cmd: 'next', args: [2, 42] }, { cmd: 'throw', args: [new Error('oops')] }])


// do stuff...
it.next()
// ... etc ...
// get a replayed iterator
const it2 = it.mimic()
// get a replayed iterator, specifying how many steps to replay
const it3 = it.mimic({ steps: 2 })
```
