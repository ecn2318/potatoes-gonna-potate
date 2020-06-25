async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("Last workout:", lastWorkout);
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    //let last = lastWorkout.exercises[lastWorkout.exercises.length - 1]

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      // Total Duration = undefined --> fix
      // reduce() goes through elements in array and adds - 
      // a - original value (will accumulate) 
      // b - incoming object, grab duration property - b.duration
      // a=0 on load, increases as it passes through array
      totalDuration: lastWorkout.exercises.reduce((a, b) => {
        return a + b.duration;
      }, 0),
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };
    console.log(workoutSummary)

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

function tallyExercises(exercises) {
  const tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "DATE",
    totalDuration: "TOTAL WORKOUT DURATON (MIN)",
    numExercises: "EXERCISES PERFORMED",
    totalWeight: "TOTAL WEIGHT LIFTED (LBS)",
    totalSets: "TOTAL SETS PERFORMED",
    totalReps: "TOTAL REPS PERFORMED",
    totalDistance: "TOTAL DISTANCE COVERED (MILES)"
  };

  Object.keys(summary).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    const line = document.createElement("br");

    strong.textContent = workoutKeyMap[key];
    const textNode = document.createTextNode(`${summary[key]}`);

    p.appendChild(strong);
    p.appendChild(line);
    p.appendChild(textNode);

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
