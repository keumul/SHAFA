const Router = require('express')
const router = new Router()
const stuffController = require('../controllers/stuffController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin/', checkRole(1), stuffController.getAllStuffs);
router.get('/admin/:id', checkRole(1), stuffController.getStuffById);

router.get('/', checkRole(4), stuffController.getAllStuffs);
router.get('/:id', checkRole(4), stuffController.getStuffById);
router.post('/', checkRole(4), stuffController.createStuff);
router.put('/:id', checkRole(4), stuffController.updateStuff);
router.delete('/:id', checkRole(4), stuffController.deleteStuff);

module.exports = router;

