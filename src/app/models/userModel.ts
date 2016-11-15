import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	fingerprint: String,
	username: String,
	password: String
}, { versionKey: false })

mongoose.model('User', userSchema)

const User = mongoose.model('User')

const createUser = user =>
	new Promise((resolve, reject) =>
		new User(user)
		.save()
		.then(user => resolve(user)))

const findUserByAuth = auth =>
	new Promise((resolve, reject) => User
		.findOne(auth)
		.lean()
		.exec()
		.then(user => resolve(user)))

const findUserById = id =>
	new Promise((resolve, reject) => User
	.findOne({_id: new mongoose.Types.ObjectId(id)})
	.then(user => resolve(user)))

const findUsers = () =>
	new Promise((resolve, reject) => User
	.find({})
	.then(users => resolve(users)))

const deleteUser = id =>
	new Promise((resolve, reject) => User
	.remove({_id: new mongoose.Types.ObjectId(id)})
	.then(user => resolve('deleted')))

export { createUser, findUserByAuth, findUserById, deleteUser, findUsers }
