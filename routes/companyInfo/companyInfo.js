const router = require('express').Router();
const upload = require('../../utils/middlewares/upload');
const { adminVerify } = require('../../utils/middlewares/authVerify');
const { validInfo } = require('../../utils/validations/users');
const { add, edit, view, remove } = require('../../controllers/companyInfo/companyInfo');


router.get('/company/:id', view);
router.post('/company',adminVerify, validInfo, upload.single('profile'), add);
router.put('/company/:id',adminVerify, validInfo, upload.single('profile'), edit);
router.delete('/company/:id',adminVerify, remove);


module.exports = router;

