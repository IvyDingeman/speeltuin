import * as model from '../models/questionModel'
import log from '../util/log'
import { createErr, sendErr, sendJSON } from '../util/expressUtils'

const createQuestion = (req, res) =>
	verifyQuestion(req)
	.then((question: any) =>
		question.err
		? sendErr(res)(question.err)
		: model.createQuestion(question)
			.then(question => sendJSON(res)(question)))

const findQuestion = (req, res) =>
	req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findQuestionById(req.params.id)
			.then(question => !question
				? sendErr(res)('question does not exist')
				: sendJSON(res)(question))
		: sendErr(res)('not a valid id')

const findQuestions = (req, res) =>
	model.findQuestions()
	.then(questions => sendJSON(res)(questions))

const deleteQuestion = (req, res) =>
		req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findQuestionById(req.params.id)
			.then(question => !question
				? sendErr(res)('question does not exist')
				: model.deleteQuestion(req.params.id)
				.then(question => sendJSON(res)(question)))
		: sendErr(res)('not a valid id')

const verifyQuestion = req => Promise.resolve(
	!req.query ? createErr('no response query')
	: !req.query.question ? createErr('no question')
	: !req.query.correct_answer ? createErr('no correct_answer')
	: {
		question: req.query.question,
		correct_answer: req.query.correct_answer === 'true' ? true : false
	})

export { createQuestion, deleteQuestion, findQuestion, findQuestions }
