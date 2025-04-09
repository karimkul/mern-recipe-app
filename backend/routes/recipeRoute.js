const express = require('express');
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require('../controller/recipeController');

const router = express.Router();

router.get('/', getRecipes); //Get all recipes
router.get('/:id', getRecipe); //Get recipe by id
router.post('/', addRecipe); //Add recipe
router.put('/:id', editRecipe); //Edit recipe by id
router.delete('/:id', deleteRecipe); //Delete recipe by id

module.exports = router;
