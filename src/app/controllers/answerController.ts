import * as mongoose from 'mongoose'
import * as model from '../models/answerModel'
import log from '../util/log'
import { createErr, sendErr, sendJSON } from '../util/expressUtils'

const createAnswer = (req, res) =>
	verifyAnswer(req)
	.then((answer: any) =>
		answer.err
		? sendErr(res)(answer.err)
		: model.createAnswer(answer)
			.then(answer => sendJSON(res)(answer)))

const findAnswer = (req, res) =>
	req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
	? model.findAnswerById(req.params.id)
		.then(answer => !answer
			? sendErr(res)('answer does not exist')
			: sendJSON(res)(answer))
	: sendErr(res)('not a valid id')

const findAnswers = (req, res) =>
	model.findAnswers()
	.then(answers => sendJSON(res)(answers))

const deleteAnswer = (req, res) =>
	req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
	? model.findAnswerById(req.params.id)
		.then(answer => !answer
			? sendErr(res)('answer does not exist')
			: model.deleteAnswer(req.params.id)
			.then(answer => sendJSON(res)(answer)))
	: sendErr(res)('not a valid id')

const verifyAnswer = req => Promise.resolve(
	!req.query ? createErr('no response query')
	: !req.query.answer ? createErr('no answer')
	: !req.query.question ? createErr('no question')
	: !req.query.user ? createErr('no user')
	: {
		user: new mongoose.Types.ObjectId(req.query.user),
		question: new mongoose.Types.ObjectId(req.query.question),
		answer: req.query.answer === 'true' ? true : false,
		timestamp: Date.now()
	})

export { createAnswer, deleteAnswer, findAnswer, findAnswers }
