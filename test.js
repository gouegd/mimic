const test = require('ava')
const mimic = require('./mimic')

function* gen() {
  yield 1
  const n = yield 2
  if (n) yield 3
  yield 4
}

test('does not break a simple iterator', t => {
    const it = mimic(gen)
    t.is(1, it.next().value)
    t.is(2, it.next().value)
    t.is(4, it.next().value)
    t.is(true, it.next().done)
})

test('can replay a simple iterator with no args passed to `next`', t => {
    const it = mimic(gen)
    it.next()

    const it2 = it.mimic()
    t.is(true, it.next().value === it2.next().value)
})

test('can replay an iterator with a value passed on a `next`', t => {
    const it = mimic(gen)
    it.next()
    it.next()
    t.is(3, it.next(true).value)

    const it2 = it.mimic()
    t.is(4, it.next().value)
    t.is(4, it2.next().value)
})
