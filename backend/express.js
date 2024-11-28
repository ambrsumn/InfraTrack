const express = require('express');

//ROUTES IMPORTS
const companyRoute = require('./routes/companyRoute');


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(202).send({
        message: "Hello World",
        success: true
    })
})

app.use('/common/company', companyRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})