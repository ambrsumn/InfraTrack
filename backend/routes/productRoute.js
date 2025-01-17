const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/Authguard");
const { getOrders, postOrder, updateOrderStatus } = require("../controllers/productController");

router.get('/getOrders', verifyToken, getOrders);
router.post('/postOrder', verifyToken, postOrder);
router.put('/updateOrderStatus', verifyToken, updateOrderStatus);
module.exports = router;
