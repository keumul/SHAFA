const Router = require('express')
const router = new Router()
const outfitController = require('../controllers/outfitController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/admin/:id', checkRole(1), outfitController.getOutfitsByUser);

router.put('/:id', checkRole(2), outfitController.updateOutfit);
router.post('/:outfitId', checkRole(2), outfitController.addStuffToOutfit);
router.get('/user/:id', checkRole(2), outfitController.getOutfitsByUser);
router.get('/stuff_outfit/:id', checkRole(2), outfitController.getAllStuffInOutfit);
router.post('/', checkRole(2), outfitController.createOutfit);
router.delete('/:id', checkRole(2), outfitController.deleteOutfit);



module.exports = router;

