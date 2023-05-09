const Router = require('express')
const router = new Router()
const labelController = require('../controllers/labelController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/labels', labelController.getAllLabels);
router.post('/labels', labelController.createLabel);
router.put('/labels/:id', labelController.updateLabel);
router.delete('/labels/:id', labelController.deleteLabel);

module.exports = router;

