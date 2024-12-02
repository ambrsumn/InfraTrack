const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/Authguard");
const { getOrders } = require("../controllers/productController");

router.get('/getOrders', verifyToken, getOrders);

module.exports = router;
// router.post('/addOrder', addOrder);