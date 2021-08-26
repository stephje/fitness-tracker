const { Schema, model } = require('mongoose');

const WorkoutSchema = new Schema({
    
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],
});

const Workout = model('workout', WorkoutSchema);

module.exports = Workout;