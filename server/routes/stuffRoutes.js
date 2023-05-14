const Router = require('express')
const router = new Router()
const stuffController = require('../controllers/stuffController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin/', checkRole(1), stuffController.getAllStuffs);
router.get('/admin/:id', checkRole(1), stuffController.getStuffById);

router.get('/', checkRole(3), stuffController.getAllStuffs);
router.get('/:id', checkRole(3), stuffController.getStuffById);
router.get('/user/:user_id', checkRole(3), stuffController.getStuffByUserId);
router.post('/', checkRole(3), stuffController.createStuff);
router.put('/:id', checkRole(3), stuffController.updateStuff);
router.delete('/:id', checkRole(3), stuffController.deleteStuff);

module.exports = router;

