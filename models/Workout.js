const { Schema, model } = require('mongoose');

const WorkoutSchema = new Schema({
    
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: { type: String },
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number,
        }
    ],
});

const Workout = model('workout', WorkoutSchema);

module.exports = Workout;