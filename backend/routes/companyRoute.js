const express = require('express');
const { getAllCompanies, postNewCompany } = require('../controllers/companyController');

const router = express.Router();


router.get('/', getAllCompanies);
router.post('/', postNewCompany)

module.exports = router;