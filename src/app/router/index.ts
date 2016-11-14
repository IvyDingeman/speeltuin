import { Router } from 'express'
import { createUser } from '../models/userModel'
const router = Router()

router.get('/test', (req, res) => {
	res.send('wew')
})

router.get('/createuser', (req, res) =>
	createUser({fingerprint: 'nope',
	username: 'Ivy Dingeman',
	password: 'aaabbb10'})
		.then(user => res.send('wew')))

export default router
