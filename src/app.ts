import express, {Application} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


import dbConnection from "./config/db";
const app: Application = express();
const PORT = process.env.PORT || 8000;

import authRoutes from './routes/auth.routes';
import booksRoutes from './routes/books.routes';
import authorRoutes from "./routes/author.routes";
import categoriesRoutes from "./routes/categories.routes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(booksRoutes)
app.use(authorRoutes)
app.use(categoriesRoutes);
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Books libary Apis',
        version: '1.0.0',
        description: 'API documentation',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
    ],
};

//  ---- Options for the swagger docs -------- //
const options = {
    swaggerDefinition,
    apis: ['./build/api/swagger.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(PORT, async () => {
    try {
        await dbConnection;
        console.log('Connected to the database ...')
    } catch (error) {
        console.log('There is an error trying to connect to the database ...');
        throw error;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});