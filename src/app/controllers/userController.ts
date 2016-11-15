const sha1 = require('sha1')

import * as model from '../models/userModel'
import log from '../util/log'
import { createErr, sendErr, sendJSON } from '../util/expressUtils'

const createUser = (req, res) =>
	verifyUser(req)
	.then((user: any) =>
		user.err
		? sendErr(res)(user.err)
		: model.createUser(user)
			.then(user => sendJSON(res)(user)))

const findUser = (req, res) =>
	req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findUserById(req.params.id)
			.then(user => !user
				? sendErr(res)('user does not exist')
				: sendJSON(res)(user))
		: sendErr(res)('not a valid id')

const findUsers = (req, res) =>
	model.findUsers()
	.then(users => sendJSON(res)(users))

// this should return a token that will be used in subsequent requests
const findUserByAuth = (req, res) =>
	verifyUserAuth(req)
	.then((auth: any) =>
		auth.err
		? sendErr(res)(auth.err)
		: model.findUserByAuth(auth)
			.then(user => sendJSON(res)(user || 'none found')))

const deleteUser = (req, res) =>
		req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)
		? model.findUserById(req.params.id)
			.then(user => !user
				? sendErr(res)('user does not exist')
				: model.deleteUser(req.params.id)
				.then(user => sendJSON(res)(user)))
		: sendErr(res)('not a valid id')

const verifyUser = req => Promise.resolve(
	!req.query ? createErr('no response query')
	: !req.query.fingerprint ? createErr('no fingerprint')
	: !req.query.username ? createErr('no username')
	: !req.query.password ? createErr('no password')
	: {
		fingerprint: req.query.fingerprint,
		username: req.query.username,
		password: sha1(req.query.password)
	})

const verifyUserAuth = req => Promise.resolve(
	!req.query ? createErr('no response query')
	: !req.query.username ? createErr('no username')
	: !req.query.password ? createErr('no password')
	: {
		username: req.query.username,
		password: sha1(req.query.password)
	})

export { createUser, findUserByAuth, deleteUser, findUser, findUsers}
