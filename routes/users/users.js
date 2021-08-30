const router = require('express').Router();
const upload = require('../../utils/middlewares/upload');
const cvUpload = require('../../utils/middlewares/cvUpload');
const { authVerify, adminVerify } = require('../../utils/middlewares/authVerify');
const { validSignUp } = require('../../utils/validations/users');
const {
    signIn,
    signUp,
    profileImage,
    adminSignIn,
    userList,
    apply
} = require('../../controllers/users/users');

/* USER API */
router.post('/sign-in', signIn);
router.post('/admin/sign-in', adminSignIn);
router.post('/sign-up', validSignUp, signUp);
router.get('/users', adminVerify, userList);
router.put('/profile-image', authVerify, upload.single('profile'), profileImage);
router.post('/apply', authVerify, cvUpload.single('cv'), apply);


module.exports = router;

