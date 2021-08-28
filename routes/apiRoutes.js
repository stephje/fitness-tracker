const router = require("express").Router();
const Workout = require("../models/Workout");

// API ROUTES HERE

// Get all workouts. 
// NOTE: This actually serves the fetch in the "getLastWorkout" function in /public/api.js file as well. All workouts are fetched in that function and then the last one in the array is returned. 
router.get('/workouts', async (req, res) => {
    try {
        // This must be an aggregate because Total Workout Duration is expected on teh main page
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


// Get workout by ID- may not be required?
router.get('/workouts/:id', async (req, res) => {
        let workout = await Workout.find({ '_id': req.params.id });
        res.json(workout);
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