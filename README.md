## Usage

```
// create a replayable iterator
const it = mimic(gen)

// same but specifying first steps
const it = mimic(gen, [{ cmd: 'next', args: 2 }, { cmd: 'throw', args: new Error('oops') }])


// do stuff...
it.next()
// ... etc ...
// get a replayed iterator
const it2 = it.mimic()
// get a replayed iterator, specified how many steps to replay
const it3 = it.mimic({ steps: 2 })
```
