// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const {
//   getRecipes,
//   getRecipe,
//   addRecipe,
//   editRecipe,
//   deleteRecipe,
// } = require('../controller/recipeController');
// const verifyToken = require('../middleware/authMiddleware');
// const router = express.Router();

// // Multer setup for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage }).single('coverImage');

// // Routes
// router.get('/', getRecipes);
// router.get('/:id', getRecipe);
// router.post('/', verifyToken, upload, addRecipe);
// router.put('/:id', upload, editRecipe);
// router.delete('/:id', deleteRecipe);

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require('../controller/recipeController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path where the uploaded file will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on timestamp
  },
});

const upload = multer({ storage }).single('coverImage');

// Routes
router.get('/', getRecipes); // Route to get all recipes
router.get('/:id', getRecipe); // Route to get a single recipe
router.post('/', verifyToken, upload, addRecipe); // Route to add a new recipe with token verification and file upload
router.put('/:id', verifyToken, upload, editRecipe); // Route to edit a recipe with token verification and file upload
router.delete('/:id', verifyToken, deleteRecipe); // Route to delete a recipe with token verification

module.exports = router;
