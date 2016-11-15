import * as mongoose from 'mongoose'
import * as model from '../models/scoreModel'
import log from '../util/log'
import { createErr, sendErr, sendJSON } from '../util/expressUtils'

const createScore = (req, res) =>
	verifyScore(req)
	.then((score: any) =>
		score.err
		? sendErr(res)(score.err)
		: model.createScore(score)
			.then(score => sendJSON(res)(score)))

const findScore = (req, res) =>
	req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findScoreById(req.params.id)
			.then(score => !score
				? sendErr(res)('score does not exist')
				: sendJSON(res)(score))
		: sendErr(res)('not a valid id')

const findScores = (req, res) =>
	model.findScores()
	.then(scores => sendJSON(res)(scores))

const deleteScore = (req, res) =>
		req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findScoreById(req.params.id)
			.then(score => !score
				? sendErr(res)('score does not exist')
				: model.deleteScore(req.params.id)
				.then(score => sendJSON(res)(score)))
		: sendErr(res)('not a valid id')

const verifyScore = req => Promise.resolve(
	!req.query ? createErr('no response query')
	: !req.query.playset ? createErr('no answer')
	: !req.query.user ? createErr('no question')
	: !req.query.score ? createErr('no user')
	: {
		playset: new mongoose.Types.ObjectId(req.query.playset),
		user: new mongoose.Types.ObjectId(req.query.user),
		score: parseInt(req.query.score) || 0,
		timestamp: Date.now()
	})

export { createScore, deleteScore, findScore, findScores }
