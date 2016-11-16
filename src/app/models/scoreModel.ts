import * as mongoose from 'mongoose'

const scoreSchema = new mongoose.Schema({
	playset: mongoose.Schema.Types.ObjectId,
	user: mongoose.Schema.Types.ObjectId,
	score: Number,
	timestamp: Number
}, { versionKey: false })

mongoose.model('Score', scoreSchema)

const Score = mongoose.model('Score')

const createScore = score =>
	new Promise((resolve, reject) =>
		new Score(score)
		.save()
		.then(score => resolve(score)))

const findScoreById = id =>
	new Promise((resolve, reject) => Score
	.findOne({_id: new mongoose.Types.ObjectId(id)})
	.then(score => resolve(score)))

const findScores = (query) =>
	new Promise((resolve, reject) => Score
	.find(query)
	.then(scores => resolve(scores)))

const deleteScore = id =>
	new Promise((resolve, reject) => Score
	.remove({_id: new mongoose.Types.ObjectId(id)})
	.then(score => resolve('deleted')))

export { createScore, findScoreById, findScores, deleteScore }
