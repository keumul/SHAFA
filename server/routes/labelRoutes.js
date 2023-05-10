const Router = require('express')
const router = new Router()
const labelController = require('../controllers/labelController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', checkRole(4), labelController.getAllLabels);
router.post('/', checkRole(4), labelController.createLabel);
router.put('/:id', checkRole(4), labelController.updateLabel);
router.delete('/:id', checkRole(4), labelController.deleteLabel);

module.exports = router;

