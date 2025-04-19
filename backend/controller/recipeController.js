const Recipes = require('../models/recipeModel');
const { Types } = require('mongoose');

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    if (!recipes.length)
      return res.status(404).json({ message: 'No recipes found' });
    return res.status(200).json(recipes);
  } catch (err) {
    console.error('Error getting recipes:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a single recipe
const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const recipe = await Recipes.findById(id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    return res.status(200).json(recipe);
  } catch (err) {
    console.error('Error getting recipe:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Add a new recipe
const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRecipe = {
      title,
      ingredients: ingredients
        .split(',')
        .map((ingredient) => ingredient.trim()),
      instructions,
      time,
      coverImage: req.file ? req.file.path : null,
    };

    const createdRecipe = await Recipes.create(newRecipe);
    return res.status(201).json({ createdRecipe });
  } catch (err) {
    console.error('Error adding recipe:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Edit a recipe
const editRecipe = async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID format' });

  const updatedData = {
    ...req.body,
    coverImage: req.file ? req.file.path : undefined,
  };

  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedRecipe)
      return res.status(404).json({ message: 'Recipe not found' });
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error('Error updating recipe:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID format' });

  try {
    const deletedRecipe = await Recipes.findByIdAndDelete(id);
    if (!deletedRecipe)
      return res.status(404).json({ message: 'Recipe not found' });
    return res.status(200).json(deletedRecipe);
  } catch (err) {
    console.error('Error deleting recipe:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
