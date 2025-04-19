const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    ingredients: {
      type: Array,
      required: [true, 'Ingredients are required.'],
    },
    instructions: {
      type: String,
      required: [true, ' Instructions are required.'],
    },
    time: {
      type: String,
      required: [true, 'Preparation time is required.'],
    },
    coverImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipes', recipeSchema);
