const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', authController.registration);
router.post('/login', authController.login);

router.get('/auth', authMiddleware, authController.getUserInfoWithToken);

module.exports = router;

