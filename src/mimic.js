const noop = () => {}

/**
 * [mimic description]
 * @param  {[type]} gen            [generator]
 * @param  {Array} [prevCalls=[]]  [arguments to the `next` calls to replay]
 * @param  {Array} [initArgs=[]]   [arguments to call the generator with]
 * @return {object}                [an iterator-like object]
 */
function mimic(gen, { prevCalls = [], initArgs = [] } = {}) {
  const calls = [ ...prevCalls ]
  const it = gen(...initArgs)

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
      return mimic(gen, { prevCalls: calls.slice(0, steps), initArgs })
    },
    [Symbol.iterator]() {
      return this
    },
  }
}

module.exports = mimic
