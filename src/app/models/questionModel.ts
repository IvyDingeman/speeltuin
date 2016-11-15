import * as mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
	question: String,
	correct_answer: Boolean
}, { versionKey: false })

mongoose.model('Question', questionSchema)

const Question = mongoose.model('Question')

const createQuestion = question =>
	new Promise((resolve, reject) =>
		new Question(question)
		.save()
		.then(question => resolve(question)))

const findQuestionById = id =>
	new Promise((resolve, reject) => Question
	.findOne({_id: new mongoose.Types.ObjectId(id)})
	.then(question => resolve(question)))

const findQuestions = () =>
	new Promise((resolve, reject) => Question
	.find({})
	.then(questions => resolve(questions)))

const deleteQuestion = id =>
	new Promise((resolve, reject) => Question
	.remove({_id: new mongoose.Types.ObjectId(id)})
	.then(question => resolve('deleted')))

export { createQuestion, findQuestionById, findQuestions, deleteQuestion }
