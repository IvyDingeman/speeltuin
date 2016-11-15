import * as mongoose from 'mongoose'

const playsetSchema = new mongoose.Schema({
	name: String
}, { versionKey: false })

mongoose.model('Playset', playsetSchema)

const Playset = mongoose.model('Playset')

const createPlayset = playset =>
	new Promise((resolve, reject) =>
		new Playset(playset)
		.save()
		.then(playset => resolve(playset)))

const findPlaysetById = id =>
	new Promise((resolve, reject) => Playset
	.findOne({_id: new mongoose.Types.ObjectId(id)})
	.then(playset => resolve(playset)))

const findPlaysets = () =>
	new Promise((resolve, reject) => Playset
	.find({})
	.then(playsets => resolve(playsets)))

const deletePlayset = id =>
	new Promise((resolve, reject) => Playset
	.remove({_id: new mongoose.Types.ObjectId(id)})
	.then(playset => resolve('deleted')))

export { createPlayset, findPlaysetById, findPlaysets, deletePlayset }
