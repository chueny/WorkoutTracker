init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
      console.log("Workout",workout);
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

