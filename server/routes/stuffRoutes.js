const Router = require('express')
const router = new Router()
const stuffController = require('../controllers/stuffController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin/', checkRole(1), stuffController.getAllStuffs);
router.get('/admin/:id', checkRole(1), stuffController.getStuffById);

router.get('/:outfit_id/outfits', stuffController.getStuffByOutfit)
router.get('/', checkRole(2), stuffController.getAllStuffs);
router.get('/:id', checkRole(2), stuffController.getStuffById);
router.get('/user/:user_id', checkRole(2), stuffController.getStuffByUserId);
router.post('/', checkRole(2), stuffController.createStuff);
router.put('/:id', checkRole(2), stuffController.updateStuff);
router.delete('/:id', checkRole(2), stuffController.deleteStuff);

module.exports = router;

