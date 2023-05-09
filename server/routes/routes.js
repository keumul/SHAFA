const Router = require('express')
const router = new Router()

const authRoutes = require('./authRoutes');
//const labelRoutes = require('./labelRoutes');
const outfitRoutes = require('./outfitRoutes');
const shelfRoutes = require('./shelfRoutes');
//const stuffRoutes = require('./stuffRoutes');


router.use('/user', authRoutes);
//router.use('/label', labelRoutes);
//router.use('/outfit', outfitRoutes);
router.use('/shelf', shelfRoutes);
//router.use('/stuff', stuffRoutes);


module.exports = router;