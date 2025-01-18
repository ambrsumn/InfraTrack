const express = require('express');
const db = require('../database/db');

const getOrders = async (req, res) => {
    console.log(req.body.user);
    // console.log(req.user);
    try {
        let query = `SELECT * FROM ordertable`;
        let orders = await new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        });

        if (orders) {
            return res.status(200).json({
                message: "Orders fetched successfully",
                success: true,
                data: orders
            });
        }
        else {
            return res.status(400).json({
                message: "Error fetching orders",
                success: false,
                error: "Orders not fetched"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error
        })
    }



}

const postOrder = async (req, res) => {
    console.log(req.body.user);
    try {
        let query = `INSERT INTO ordertable (product_name, product_quantity, ordered_by, ordered_on, status) VALUES  (?, ?, ?, ?, ?)`
        let currentDate = new Date();

        let selectQuery = `SELECT * FROM ordertable`;

        const postedOrders = await new Promise((resolve, reject) => {
            db.query(selectQuery, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        });


        let orderExists = false;

        postedOrders.forEach((orders) => {
            if (orders.ordered_by == req.body.user.userId && orders.product_name == req.body.productName && orders.product_quantity == req.body.productQuantity) {
                orderExists = true;
            }
        })

        if (orderExists) {
            return res.status(400).json({
                success: false,
                message: "Order already placed"
            })
        }

        let postedOrder = await new Promise((resolve, reject) => {
            db.query(query, [req.body.productName, req.body.productQuantity, req.body.user.userId, currentDate, 'Order Placed'], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        });

        if (postedOrder) {
            return res.status(200).json({
                success: true,
                message: "Order posted successfully",
                data: postedOrder
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Error posting order",
                error: "Order not posted"
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error posting order",
            error: error
        })
    }

}

const updateOrderStatus = async (req, res) => {
    try {
        let orderId = req.body.orderId;
        let newStatus = req.body.status;
        let updateQuery = `UPDATE ordertable SET status = ? WHERE id = ?`;
        let selectQuery = `SELECT * FROM ordertable`;

        const allOrders = await new Promise((resolve, reject) => {
            db.query(selectQuery, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        });

        let orderExists = false;
        allOrders.forEach((order) => {
            if (order.id === orderId) {
                orderExists = true;
            }
        });

        if (!orderExists) {
            return res.status(400).json({
                success: false,
                message: "Order does not exist"
            })
        }

        let updatedOrders = await new Promise((resolve, reject) => {
            db.query(updateQuery, [newStatus, orderId], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
        });

        if (updatedOrders)
            return res.status(200).json({
                success: true,
                message: "Order status updated successfully",
                data: updatedOrders
            })
        return res.status(400).json({
            success: false,
            message: "Error updating order status",
            error: "Order status not updated"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error updating order status",
            error: error
        })
    }
}

module.exports = {
    getOrders,
    postOrder,
    updateOrderStatus
}