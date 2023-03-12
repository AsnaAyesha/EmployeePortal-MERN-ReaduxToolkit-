const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login',userController.Login);
router.get('/profile',userController.verifyToken,userController.getUser);
//verify token is used for after refresh the page, user can able to view user details.
//router.get('/refresh',userController.refreshToken,userController.verifyToken,userController.getUser)
router.post('/logout', userController.Logout)
 module.exports = router;