const sleep = (ms = 500) => new Promise(r => setTimeout(r, ms))

export default sleep