import * as mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
	user: mongoose.Schema.Types.ObjectId,
	question: mongoose.Schema.Types.ObjectId,
	answer: Boolean,
	timestamp: Number
}, { versionKey: false })

mongoose.model('Answer', answerSchema)

const Answer = mongoose.model('Answer')

const createAnswer = answer =>
	new Promise((resolve, reject) =>
		new Answer(answer)
		.save()
		.then(answer => resolve(answer)))

const findAnswerById = id =>
	new Promise((resolve, reject) => Answer
	.findOne({question: new mongoose.Types.ObjectId(id)})
	.then(answer => resolve(answer)))

const findAnswers = query =>
	new Promise((resolve, reject) => Answer
	.find(query)
	.then(answers => resolve(answers)))

const deleteAnswer = id =>
	new Promise((resolve, reject) => Answer
	.remove({_id: new mongoose.Types.ObjectId(id)})
	.then(answer => resolve('deleted')))

export { createAnswer, findAnswerById, findAnswers, deleteAnswer }
