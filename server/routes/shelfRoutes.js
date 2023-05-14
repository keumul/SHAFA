const Router = require('express')
const router = new Router()
const shelfController = require('../controllers/shelfController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin', checkRole(1), shelfController.getAllShelves);
router.get('/admin/:id', checkRole(1), shelfController.getShelfById);

router.get('/', checkRole(3), shelfController.getAllShelves);
router.get('/categ', checkRole(3), shelfController.getAllCategories);
router.get('/:id', checkRole(3), shelfController.getShelfById);
router.get('/user/:user_id', checkRole(3), shelfController.getShelfByUserId);
router.post('/', checkRole(3), shelfController.createShelf);
router.put('/:id', checkRole(3), shelfController.updateShelf);
router.post('/:shelfId', checkRole(3), shelfController.sharedAccess)
router.delete('/:id', checkRole(3), shelfController.deleteShelf);

module.exports = router;

