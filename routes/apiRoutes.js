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

router.get('/workouts/:id', async (req, res) => {
        let workout = await Workout.find({ '_id': req.params.id });
        res.json(workout);
});


module.exports = router;