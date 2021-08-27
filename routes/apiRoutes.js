const router = require("express").Router();
const Workout = require("../models/Workout");

// API ROUTES HERE

router.get('/workouts', async (req, res) => {
    try {
        let workouts = await Workout.find({});
        return res.json(workouts);
    } catch{
        res.status(400).json(err);
    }
});

module.exports = router;