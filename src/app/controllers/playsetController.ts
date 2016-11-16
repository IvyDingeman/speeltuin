import * as model from '../models/playsetModel'
import log from '../util/log'
import { createErr, sendErr, sendJSON } from '../util/expressUtils'

const createPlayset = (req, res) =>
	verifyPlayset(req)
	.then((playset: any) =>
		playset.err
		? sendErr(res)(playset.err)
		: model.createPlayset(playset)
			.then(playset => sendJSON(res)(playset)))

const findPlayset = (req, res) =>
	req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findPlaysetById(req.params.id)
			.then(playset => !playset
				? sendErr(res)('playset does not exist')
				: sendJSON(res)(playset))
		: sendErr(res)('not a valid id')

const findPlaysets = (req, res) =>
	model.findPlaysets()
	.then(playsets => sendJSON(res)(playsets))

const deletePlayset = (req, res) =>
		req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findPlaysetById(req.params.id)
			.then(playset => !playset
				? sendErr(res)('playset does not exist')
				: model.deletePlayset(req.params.id)
				.then(playset => sendJSON(res)(playset)))
		: sendErr(res)('not a valid id')

const verifyPlayset = req => Promise.resolve(
	!req.body ? createErr('no response body')
	: !req.body.name ? createErr('no name')
	: {
		name: req.body.name
	})

export { createPlayset, deletePlayset, findPlayset, findPlaysets }
