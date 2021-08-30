const router = require('express').Router();
const { adminVerify } = require('../../utils/middlewares/authVerify');
const { add, edit, remove, view } = require('../../controllers/jobInfo/jobInfo');


/* USER API */
router.post('/job', adminVerify, add);
router.put('/job/:id', adminVerify, edit);
router.get('/job/:id', view);
router.delete('/job/:id', adminVerify, remove);


module.exports = router;

