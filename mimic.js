/**
 * [mimic description]
 * @param  {[type]} gen            [description]
 * @param  {Object} [prevCalls=[]] [description]
 * @return {[type]}                [description]
 */
function mimic(gen, prevCalls = []) {
  const calls = [ ...prevCalls ]
  const it = gen()

  calls.forEach(({cmd, args}) => {
    it[cmd](...args)
  })

  function saveAndCall(cmd, args) {
    calls.push({cmd, args})
    return it[cmd](...args)
  }

  return {
    next(...args) {
      return saveAndCall('next', args)
    },
    throw(...args) {
      return saveAndCall('throw', args)
    },
    return(...args) {
      return saveAndCall('return', args)
    },
    mimic() {
      return mimic(gen, calls)
    },
    [Symbol.iterator]() {
      return this
    },
  }
}

module.exports = mimic
