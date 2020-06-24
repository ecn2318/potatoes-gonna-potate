const router = require("express").Router();
const Workouts = require("../models").Workout;

// see api.js --  createWorkout(data = {}) - fetch("/api/workouts" -- method: "POST",
router.post("/api/workouts", ({ body }, res) => {
    Workouts.create(body)
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// see api.js getLastWorkout() -- fetch("/api/workouts");
router.get("/api/workouts", (req, res) => {
    Workouts.find({})
        //sort by date desc
        //.sort({ date: -1 })
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// see api.js - getWorkoutsInRange() -- fetch(`/api/workouts/range`);
router.get("/api/workouts/range", (req, res) => {
    Workouts.find({})
        //sort by date desc
        //.sort({ date: -1 })
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


// see api.js addExercise(data) -- fetch("/api/workouts/" + id -- method: "PUT",
// PUT request - :id -- UPDATE workout - add exercise to workout
router.put('/api/workouts/:id', (req, res) => {
    //Workouts.findByIdAndUpdate(req.params.id, { exercises: req.body })
    // insert new exercise instead of just updating/replacing existing
    // update the values in an array with `$push`
    // Workouts.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
    Workouts.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
        .then(workoutDB => {
            res.json(workoutDB);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})



module.exports = router;