const nextTick = require('next-tick')

const promisify = (syncFn) => {
  return new Promise((resolve, reject) => {
    nextTick(() => {
      try {
        resolve(syncFn())
      } catch (error) {
        reject(error)
      }
    })
  })
}

class MemoryStore {
  constructor () {
    this.memory = {}
  }

  getItem = (key) => {
    return promisify(() => {
      return this.memory[key]
    })
  }

  setItem = (key, value) => {
    return promisify(() => {
      this.memory[key] = value
    })
  }

  removeItem = (key) => {
    return promisify(() => {
      delete this.memory[key]
    })
  }

  getItemIds = () => {
    return promisify(() => {
      return Object.keys(this.memory)
    })
  }

  clean = () => {
    return promisify(() => {
      this.memory = {}
    })
  }
}

module.exports = MemoryStore
