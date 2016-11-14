import * as mongoose from 'mongoose'

import config from '../../config'

mongoose.connect(config.mongooseURI)

const db = mongoose.connection

export default () => new Promise((resolve, reject) => {
	db.on('error', () => reject(console.error.bind(console, 'connection error:')))
	db.once('open', () => {
		console.log('connected to mongoDB')
		resolve('connected')
	})
})
