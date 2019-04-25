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

function MemoryStore() {
  this.memory = {}
}

MemoryStore.prototype.getItem = function (key) {
  return promisify(() => {
    return this.memory[key]
  })
}

MemoryStore.prototype.setItem = function (key, value) {
  return promisify(() => {
    this.memory[key] = value
  })
}

MemoryStore.prototype.removeItem = function (key) {
  return promisify(() => {
    delete this.memory[key]
  })
}

MemoryStore.prototype.getItemIds = function () {
  return promisify(() => {
    return Object.keys(this.memory)
  })
}

MemoryStore.prototype.clean = function () {
  return promisify(() => {
    this.memory = {}
  })
}

module.exports = MemoryStore
