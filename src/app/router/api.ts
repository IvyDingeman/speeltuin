import { Router } from 'express'
import * as userController from '../controllers/userController'
import * as playsetController from '../controllers/playsetController'
import * as questionController from '../controllers/questionController'
import * as answerController from '../controllers/answerController'
import * as scoreController from '../controllers/scoreController'

const router = Router()

router.post('/user', userController.createUser)			// TODO: use playground auth middleware
router.post('/user/auth', userController.findUserByAuth)
router.delete('/user/:id', userController.deleteUser)			// TODO: use user auth middleware
router.get('/user', userController.findUsers)

router.post('/playset', playsetController.createPlayset)		// TODO: use playground auth middleware
router.get('/playset', playsetController.findPlaysets)			// TODO: use playground auth middleware
router.get('/playset/:id', playsetController.findPlayset)		// TODO: use playground auth middleware
router.delete('/playset/:id', playsetController.deletePlayset)	// TODO: use playground auth middleware

router.post('/question', questionController.createQuestion)			// TODO: use playground auth middleware
router.get('/question', questionController.findQuestions)			// TODO: use playground auth middleware
router.get('/question/:id', questionController.findQuestion)		// TODO: use playground auth middleware
router.delete('/question/:id', questionController.deleteQuestion)	// TODO: use playground auth middleware

router.post('/answer', answerController.createAnswer)		// TODO: use playground auth middleware
router.get('/answer', answerController.findAnswers)			// TODO: use playground auth middleware
router.get('/answer/:id', answerController.findAnswer)		// TODO: use playground auth middleware
router.delete('/answer/:id', answerController.deleteAnswer)	// TODO: use playground auth middleware

router.post('/score', scoreController.createScore)		// TODO: use playground auth middleware
router.get('/score', scoreController.findScores)			// TODO: use playground auth middleware
router.get('/score/:id', scoreController.findScore)		// TODO: use playground auth middleware
router.delete('/score/:id', scoreController.deleteScore)	// TODO: use playground auth middleware

export default router
