const { Schema, model } = require('mongoose');

const ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
});

const Exercise = model('exercise', ExerciseSchema);

module.exports = Exercise;