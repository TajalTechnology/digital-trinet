const router = require('express').Router();
const { home } = require('../../controllers/home/index');

router.get('/', home);

module.exports = router;

