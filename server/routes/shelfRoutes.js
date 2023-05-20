const Router = require('express')
const router = new Router()
const shelfController = require('../controllers/shelfController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin', checkRole(1), shelfController.getAllShelvesAdmin);
router.get('/admin/:id', checkRole(1), shelfController.getShelfById);

router.get('/categ', checkRole(2), shelfController.getAllCategories);
router.get('/:id', checkRole(2), shelfController.getAllShelves);

router.get('/access/:shelfId', checkRole(2), shelfController.addUserToShelf);


router.get('/:id', checkRole(2), shelfController.getShelfById);
router.post('/', checkRole(2), shelfController.createShelf);
router.put('/:id', checkRole(2), shelfController.updateShelf);
router.post('/access', checkRole(2), shelfController.sharedAccess)
router.delete('/:id', checkRole(2), shelfController.deleteShelf);

module.exports = router;

