const Router = require('express')
const router = new Router()
const shelfController = require('../controllers/shelfController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', shelfController.getAllShelves);
router.post('/', shelfController.createShelf);
router.put('/:id', shelfController.updateShelf);
router.delete('/:id', shelfController.deleteShelf);

module.exports = router;

