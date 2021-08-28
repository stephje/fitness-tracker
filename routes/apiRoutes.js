const router = require("express").Router();
const Workout = require("../models/Workout");

// Get all workouts
// This is used in the getLastWorkout function in /public/api.js
// totalDuration had to be added because it's needed in the "Last Workout" section on the main page
router.get('/workouts', async (req, res) => {
    try {
        let workouts = await Workout.aggregate(
            [
                {$match: {}},
                {$addFields: {
                    totalDuration: {$sum: '$exercises.duration'}
                }}
            ]  
        );
        return res.json(workouts);
    } catch (error) {
        res.status(400).json(error);
    }
});

//Get workouts in range
// totalDuration had to be added because it's needed for the graphs on the dashboard (stats page)
router.get('/workouts/range', async (req, res) => {
    try {
        let lastSevenWorkouts = await Workout.aggregate(
            [
                {$match: {}},
                {$sort: {day:-1}},
                {$limit: 7},
                {$addFields: {
                    totalDuration: {$sum: '$exercises.duration'}
                }}
            ]
        );
        return res.json(lastSevenWorkouts);
    } catch (error) {
        res.status(400).json(error);
    }
});

//Create a new workout
router.post("/workouts", async (req, res) => {
    try {
        let postResponse = await Workout.create(req.body);
        console.log("Post Response", postResponse)
        res.send(postResponse);
    } catch (error) {
        res.status(400).json(error);
    }
  });

module.exports = router;