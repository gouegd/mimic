const noop = () => {}

/**
 * [mimic description]
 * @param  {[type]} gen            [description]
 * @param  {Object} [prevCalls=[]] [description]
 * @return {[type]}                [description]
 */
function mimic(gen, prevCalls = []) {
  const calls = [ ...prevCalls ]
  const it = gen()

  calls.forEach(({cmd, args, after = noop}) => {
    after(it[cmd](...args))
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
    mimic({ steps = calls.length } = {}) {
      return mimic(gen, calls.slice(0, steps))
    },
    [Symbol.iterator]() {
      return this
    },
  }
}

module.exports = mimic
