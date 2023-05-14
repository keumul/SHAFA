const Router = require('express')
const router = new Router()
const labelController = require('../controllers/labelController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', checkRole(3), labelController.getAllLabels);
router.post('/', checkRole(3), labelController.createLabel);
router.put('/:id', checkRole(3), labelController.updateLabel);
router.delete('/:id', checkRole(3), labelController.deleteLabel);

module.exports = router;

