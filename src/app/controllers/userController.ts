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
			.then((user: any) => sendJSON(res)(removePasswords(user))))

const findUser = (req, res) =>
	!req.params.id.match(/^[0-9a-fA-F]{24}$/)
	? sendErr(res)('not a valid id')
	: model.findUserById(req.params.id)
		.then((user: any) => !user
		? sendErr(res)('user does not exist')
		: sendJSON(res)(removePasswords(user)))

const findUsers = (req, res) =>
	model.findUsers()
	.then((users: any[]) => sendJSON(res)(users.map(removePasswords)))

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
	!req.body ? createErr('no response body')
	: !req.body.fingerprint ? createErr('no fingerprint')
	: !req.body.username ? createErr('no username')
	: !req.body.password ? createErr('no password')
	: {
		fingerprint: req.body.fingerprint,
		username: req.body.username,
		password: sha1(req.body.password)
	})

const verifyUserAuth = req => Promise.resolve(
	!req.body ? createErr('no response body')
	: !req.body.username ? createErr('no username')
	: !req.body.password ? createErr('no password')
	: {
		username: req.body.username,
		password: sha1(req.body.password)
	})

const removePasswords = user => ({username: user.username, _id: user._id})

export { createUser, findUserByAuth, deleteUser, findUser, findUsers}
