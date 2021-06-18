
const {Router}  =   require('express');
const router = Router();
const userController =  require('../controllers/userController')

router.post('/login',userController.post_login);
router.get('/userlogin',userController.get_login);

router.get('/userregister',userController.get_register);
router.post('/register',userController.post_register);

router.get('/userview',userController.displayUserView);

router.get('/signout',userController.signout);
router.get('/waterreg',userController.waterreg);

router.post('/waterregister',userController.postwaterreg);





module.exports = router;