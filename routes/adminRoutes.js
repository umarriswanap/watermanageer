const {Router}  =   require('express');
const router = Router();
const adminController = require('../controllers/adminController')

router.get('/admin-login',adminController.get_admin_login);
router.post('/admin-login',adminController.post_admin_login);

router.post('/adminvalueset',adminController.valueset)


module.exports = router;
