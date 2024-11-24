const express = require('express');
const router = express.Router();
const {product , list , update , remove} = require ('../controllers/productcontroller/productController')
const { auth } = require('../Middleware/authMiddleware')

router.post('/AddProducts', product);
router.get('/list', auth , list);

module.exports = router