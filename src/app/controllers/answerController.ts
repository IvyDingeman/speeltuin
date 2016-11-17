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
	? model.findAnswerByQuestionId(req.params.id)
		.then(answer => !answer
			? sendErr(res)('answer does not exist')
			: sendJSON(res)(answer))
	: sendErr(res)('not a valid id')

const findAnswers = (req, res) =>
	model.findAnswers(getParams(req))
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
	!req.body ? createErr('no response body')
	: !req.body.answer ? createErr('no answer')
	: !req.body.question ? createErr('no question')
	: !req.body.user ? createErr('no user')
	: {
		user: new mongoose.Types.ObjectId(req.body.user),
		question: new mongoose.Types.ObjectId(req.body.question),
		answer: req.body.answer,
		timestamp: Date.now()
	})

const getParams = req =>
	req.query.user && req.query.user.match(/^[0-9a-fA-F]{24}$/)
	? {user: new mongoose.Types.ObjectId(req.query.user)}
	: {}

export { createAnswer, deleteAnswer, findAnswer, findAnswers }
