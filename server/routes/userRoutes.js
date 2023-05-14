const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', userController.getUsers);
router.delete('/:id', checkRole(1), userController.deleteUser);

router.get('/role/:id', userController.getUserRole);

module.exports = router;

