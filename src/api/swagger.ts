/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully. Returns a success message and authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Email already exists or other validation error.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully. Returns a success message and authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Incorrect email or password, or other validation error.
 *       404:
 *         description: User not found with the provided email.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books endpoints
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorName:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               summary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully.
 *       404:
 *         description: Author or category not found.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books. Returns an array of books with their details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   category:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                   publishedYear:
 *                     type: integer
 *                   summary:
 *                     type: string
 *       404:
 *         description: Books not found.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found by the given ID. Returns the book details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 publishedYear:
 *                   type: integer
 *                 summary:
 *                   type: string
 *       404:
 *         description: Book not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorName:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               summary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *       400:
 *         description: Book couldn't be updated due to validation errors.
 *       404:
 *         description: Book or related resources not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *       400:
 *         description: Book couldn't be deleted due to validation errors.
 *       404:
 *         description: Book not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Authors endpoints
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               biography:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created successfully.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors. Returns an array of authors with their details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   biography:
 *                     type: string
 *       404:
 *         description: Authors not found.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found by the given ID. Returns the author details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 biography:
 *                   type: string
 *       404:
 *         description: Author not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               biography:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *       400:
 *         description: Author couldn't be updated due to validation errors.
 *       404:
 *         description: Author not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully.
 *       400:
 *         description: Author couldn't be deleted due to validation errors.
 *       404:
 *         description: Author not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories endpoints
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories. Returns an array of categories with their details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *       404:
 *         description: Categories not found.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found by the given ID. Returns the category details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Category not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Category couldn't be updated due to validation errors.
 *       404:
 *         description: Category not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       400:
 *         description: Category couldn't be deleted due to validation errors.
 *       404:
 *         description: Category not found with the given ID.
 *       500:
 *         description: Internal server error. Indicates a problem with the server or database.
 */
