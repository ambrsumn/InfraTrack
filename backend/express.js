const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//ROUTES IMPORTS
const companyRoute = require('./routes/companyRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');


const app = express();
const port = process.env.PORT || 8080;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'This is a simple CRUD API application made with Express and documented with Swagger',
        contact: {
            name: 'Your Name',
            email: 'your-email@example.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
    ],
};

// Swagger options
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(202).send({
        message: "Hello World",
        success: true
    })
})

app.use('/common/company', companyRoute);
app.use('/authentication/user', userRoute);
app.use('/orders', productRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})