// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });

API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}
function populateChart(data) {
  let durations = duration(data);
  let distances = distance(data);
  let pounds = calculateTotalWeight(data);
  let c_workouts = cWorkoutNames(data);
  let r_workouts = rWorkoutNames(data);
  let dates = data.map(e => formatDate(e.day)) //grab date
  //day: "2020-06-15T04:57:05.346Z"
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  /*
    let start = new Date(),
      end = new Date();
  
    start.setDate(start.getDate() - 7); // set to 'now' minus 7 days.
    start.setHours(0, 0, 0, 0); */

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Duration (minutes)",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [{
          ticks: {
            min: 0,
            max: 4,
          }
          /*display: true,
          scaleLabel: {
            display: true
          }*/
          /* type: "time",
           time: {
             min: start,
             max: end,
           }*/
        }],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "lbs",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Resistance Training: Total Weight Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });


  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: c_workouts,
      datasets: [
        {
          label: "miles",
          backgroundColor: colors,
          // data: durations
          data: distances
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Cardio Training: Exercises Performed",
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: r_workouts,
      datasets: [
        {
          label: "Resistance Training: Exercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Resistance Training: Exercises Performed"
      }
    }
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

function distance(data) {
  let distances = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      distances.push(exercise.distance);
    });
  });

  return distances;
}

function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      total.push(exercise.weight);
    });
  });

  return total;
}

function cWorkoutNames(data) {
  let cWorkouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exercise.type === "cardio") {
        cWorkouts.push(exercise.name);
      }
    });
  });

  return cWorkouts;
}

function rWorkoutNames(data) {
  let rWorkouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (exercise.type === "resistance") {
        rWorkouts.push(exercise.name);
      }
    })
  })
  return rWorkouts;
}


function formatDate(date) {
  const options = {
    weekday: "long"
  };

  return new Date(date).toDateString(options);
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}