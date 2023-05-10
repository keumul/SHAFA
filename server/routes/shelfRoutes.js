const Router = require('express')
const router = new Router()
const shelfController = require('../controllers/shelfController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin', checkRole(1), shelfController.getAllShelves);
router.get('/admin/:id', checkRole(1), shelfController.getShelfById);

router.get('/', checkRole(4), shelfController.getAllShelves);
router.get('/:id', checkRole(4), shelfController.getShelfById);
router.post('/', checkRole(4), shelfController.createShelf);
router.put('/:id', checkRole(4), shelfController.updateShelf);
router.post('/:shelfId', checkRole(4), shelfController.sharedAccess)
router.delete('/:id', checkRole(4), shelfController.deleteShelf);

module.exports = router;

