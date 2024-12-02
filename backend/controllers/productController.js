const express = require('express');
const db = require('../database/db');

const getOrders = (req, res) => {
    console.log(req.body.user);
    return res.status(403).json({
        success: true,
        message: "Orders fetched successfully",
        data: []
    })
}

module.exports = {
    getOrders
}