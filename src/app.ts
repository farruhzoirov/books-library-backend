import express, {Application} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import connectDB from "./config/db";
const app: Application = express();
const PORT = process.env.PORT || 8000;

import authRoutes from './routes/auth.routes';
import booksRoutes from './routes/books.routes';
import authorRoutes from "./routes/author.routes";
import categoriesRoutes from "./routes/categories.routes";

function main() {
    // Security middleware
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
    }));

    // Compression middleware for better performance
    app.use(compression({
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression.filter(req, res);
        },
        level: 6, // Compression level (1-9, 6 is good balance)
        threshold: 1024, // Only compress responses larger than 1KB
    }));

    // Rate limiting to prevent abuse
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: {
            error: 'Too many requests from this IP, please try again later.',
        },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

    // Apply rate limiting to all requests
    app.use(limiter);

    // More strict rate limiting for auth endpoints
    const authLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5, // Limit each IP to 5 auth requests per windowMs
        message: {
            error: 'Too many authentication attempts, please try again later.',
        },
    });

    // Request logging for monitoring
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

    // Body parsing with size limits for security and performance
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Routes with specific rate limiting for auth
    app.use('/auth', authLimiter);
    app.use(authRoutes);
    app.use(booksRoutes)
    app.use(authorRoutes)
    app.use(categoriesRoutes);

    // Swagger configs
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

    // Health check endpoint
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
        });
    });

    // 404 handler
    app.use('*', (req, res) => {
        res.status(404).json({
            error: 'Route not found',
            path: req.originalUrl,
        });
    });

    // Server is running here
    app.listen(PORT, async () => {
        try {
            await connectDB();
            console.log('Database connection established successfully')
        } catch (error) {
            console.log('There is an error trying to connect to the database ...');
            throw error;
        }
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

main()