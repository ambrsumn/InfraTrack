const express = require('express');
const { getAllCompanies, postNewCompany } = require('../controllers/companyController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API for managing companies
 */

/**
 * @swagger
 * /common/company:
 *   get:
 *     summary: Retrieve a list of companies
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the company to retrieve
 *       - in: query
 *         name: companyName
 *         schema:
 *           type: string
 *         description: Name of the company to search for
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Companies fetched successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       companyName:
 *                         type: string
 *                         example: Example Corp
 *       500:
 *         description: Error fetching companies
 */
router.get('/', getAllCompanies);

/**
 * @swagger
 * /common/company:
 *   post:
 *     summary: Add a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Example Corp
 *     responses:
 *       202:
 *         description: Company added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid request data
 */
router.post('/', postNewCompany);

module.exports = router;
