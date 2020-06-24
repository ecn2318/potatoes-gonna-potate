const router = require("express").Router();
const Workouts = require("../models/workoutModel.js");

router.post("/api/workouts", ({ body }, res) => {
    Workouts.create(body)
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// grab all workouts
router.get("/api/workouts", (req, res) => {
    Workouts.find({})
        //sort by date desc
        .sort({ date: -1 })
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});



module.exports = router;