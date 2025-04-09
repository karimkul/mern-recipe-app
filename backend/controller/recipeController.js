const Recipes = require('../models/recipeModel');
const { Types } = require('mongoose');

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();

    if (!recipes.length)
      return res.status(404).json({ message: 'No recipes found' });

    return res.status(200).json(recipes);
  } catch (err) {
    console.error('Error getting all recipes:', err);

    return res.status(500).json({ message: 'Server error' });
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const recipe = await Recipes.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (err) {
    console.error('Error getting recipe:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time, coverImage } = req.body;

    if (!title || !ingredients || !instructions || !time) {
      res.status(400).json({ message: 'Required fields can not be empty' });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage,
    });
    return res.status(201).json({ newRecipe });
  } catch (err) {
    console.error('Error adding recipe:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, time, coverImage } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const updateData = {
      title,
      ingredients,
      instructions,
      time,
      coverImage,
    };

    const updatedRecipe = await Recipes.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error('Error updating recipe:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const recipe = await Recipes.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (err) {
    console.error('Error deleting recipe:', err);

    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
