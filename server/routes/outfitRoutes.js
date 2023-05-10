const Router = require('express')
const router = new Router()
const outfitController = require('../controllers/outfitController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin', checkRole(1), outfitController.getAllOutfits);
router.get('/admin/:id', checkRole(1), outfitController.getOutfitById);

router.get('/', checkRole(4), outfitController.getAllOutfits);
router.get('/:id', checkRole(4), outfitController.getOutfitById);
router.put('/:id', checkRole(4), outfitController.updateOutfit);
router.post('/:outfitId', checkRole(4), outfitController.addStuffToOutfit)
router.post('/', checkRole(4), outfitController.createOutfit);
router.delete('/:id', checkRole(4), outfitController.deleteOutfit);

module.exports = router;

