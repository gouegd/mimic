Usages
===

const it = mimic(gen)

const it = mimic(gen, [{ cmd: 'next', args: 2 }, { cmd: 'throw', args: new Error('oops') }])

const it = mimic(gen)
it.next()
... etc ...
const it2 = it.mimic()
const it3 = it.mimic({ steps: 2 })
