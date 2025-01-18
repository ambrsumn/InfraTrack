const db = require('../database/db');

getAllCompanies = (req, res) => {
    let query = '';
    let params = [];

    if (req?.query?.id || req?.query?.companyName) {
        query = `SELECT * FROM companytable WHERE id = ? OR companyName LIKE ?`;
        params.push(req.query.id || null);
        params.push(req.query.companyName ? `%${req.query.companyName}%` : null);
    } else {
        query = `SELECT * FROM companytable`;
    }

    console.log(query);
    console.log(params);

    db.query(query, params, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Error getting companies",
                success: false
            })
        }
        else {
            res.status(200).send({
                message: "Companies fetched successfully",
                success: true,
                data: results
            })
        }
    })
}

postNewCompany = (req, res) => {
    let query;
    let params = [];

    console.log(req.body);
    let companyName = req.body.companyName;



    if (!companyName) {
        res.satus(400).send({
            message: "no company name",
            success: "false"
        })
    }
    query = `INSERT INTO companytable (companyName) VALUES (?)`;
    params.push(companyName);

    db.query(query, params, (err, result) => {
        if (err) {
            console.log(err);
            res.status(402).send({
                success: "false",
                message: "Error adding company",
            })
        }
        else {
            res.status(202).send({
                success: "true",
                data: result
            })
        }
    })
}

module.exports = {
    getAllCompanies,
    postNewCompany
};