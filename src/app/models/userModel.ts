import * as mongoose from 'mongoose'

const modelSchema = new mongoose.Schema({
	fingerprint: String,
	username: String,
	password: String
}, { versionKey: false })

mongoose.model('Model', modelSchema)

const Model: any = mongoose.model('Model')

// Model.remove({}, () => console.log('removed all models'))

const createUser = user => new Promise((resolve, reject) => {
	user = new Model(user)
	console.log('saving user')
	resolve(user.save())
})

export {createUser}
