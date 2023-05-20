const Router = require('express')
const router = new Router()
const labelController = require('../controllers/labelController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', checkRole(2), labelController.getAllLabels);
router.post('/', checkRole(2), labelController.createLabel);
router.put('/:id', checkRole(2), labelController.updateLabel);
router.delete('/:id', checkRole(2), labelController.deleteLabel);

module.exports = router;

