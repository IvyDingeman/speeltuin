const createErr = err => ({err})

const sendJSON = res => json => res.status(200).json(json)
const sendErr = res => err => res.status(400).json(err)

export { createErr, sendJSON, sendErr}
