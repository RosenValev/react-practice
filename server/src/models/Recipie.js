const mongoose = require('mongoose');

const recipieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'image is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    prepTime: {
        type: Number,
        required: [true, 'prepTime is required'],
        min: [1, "Must be possitive number"]
    },
    cookTime: {
        type: Number,
        required: [true, 'cookTime is required'],
        min: [1, "Must be possitive number"]
    },
    totalTime: {
        type: Number,
        required: [true, 'totalTime is required'],
        min: [1, "Must be possitive number"]
    },
    serves: {
        type: Number,
        required: [true, 'Serves is required'],
        min: [1, "Must be possitive number"]
    },
    ingredients: {
        type: String,
        required: [true, 'Ingridients is required'],
    },
    directions: {
        type: String,
        required: [true, 'Directions is required'],
    },
    commentList: [{
        username: String,
        comment: String,
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const Recipie = mongoose.model('Recipie', recipieSchema);

module.exports = Recipie;