const express = require('express');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSignUp = async (req, res) => {
    try {
        console.log(req.body);
        let { name, userRole, password, mobileNumber, companyId } = req.body;

        if (!name || !userRole || !password || !mobileNumber || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const allUsersQuery = 'SELECT * FROM employeetable';
        const existingUsers = await new Promise((resolve, reject) => {
            db.query(allUsersQuery, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        let userExists = false;
        existingUsers.forEach(user => {
            if (
                user.userMobileNumber === mobileNumber ||
                user.employeeName === name
            ) {
                userExists = true;
                // break;
            }
        });

        if (userExists) {
            return res.status(200).json({
                message: "User Already Exists",
                success: false,
            });
        }
        const insertQuery = `
            INSERT INTO employeetable 
            (employeeName, userRoleId, userPassword, userMobileNumber, companyId) 
            VALUES (?, ?, ?, ?, ?)`;
        const result = await new Promise((resolve, reject) => {
            db.query(insertQuery, [name, userRole, hashedPassword, mobileNumber, companyId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.status(200).json({
            message: "User Created Successfully",
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error,
        });
    }
};

const userLogin = async (req, res) => {
    try {
        let { mobileNumber, password } = req.body;

        if (!mobileNumber || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let query = `SELECT * FROM employeetable WHERE userMobileNumber = ?`;

        const selectedUser = await new Promise((resolve, reject) => {
            db.query(query, [mobileNumber], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (!selectedUser) {
            return res.status(404).json({
                message: "User Not Found",
                success: false
            });
        }

        if (selectedUser) {
            const isPasswordValid = await bcrypt.compare(password, selectedUser[0].userPassword);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Invalid Password",
                    success: false
                });
            }
            else {
                const token = jwt.sign({ userId: selectedUser[0].id, userRoleId: selectedUser[0].userRoleId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

                return res.status(200).json({
                    message: "Login Successful",
                    success: true,
                    data: {
                        token: token,
                        userName: selectedUser[0].employeeName,
                        userRole: selectedUser[0].userRoleId,
                        userId: selectedUser[0].id,
                        companyId: selectedUser[0].companyId
                    }
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            success: "false",
            message: "Internal Server Error",
            error: error
        })
    }
}

module.exports = {
    userSignUp,
    userLogin
};
