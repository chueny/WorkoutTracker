const express = require("express");
const logger = require("morgan"); // do not think we need this
const mongoose = require("mongoose");
const path = require("path");
var cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8001;

const Workout = require("./models/workoutModel.js");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
{ useNewUrlParser: true });

let db = mongoose.connection;

app.use(logger("dev")); 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

//Routes for each of the html routes, to refactor under views
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

//get last workout
app.get("/api/workouts", (req, res) => {
    Workout.find({}).then(data =>{
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res)=>{
    console.log("THIS IS THE APP.PUT", req.body);
    
    Workout.update(
        {
            _id: req.params.id
        }, 
        {
            $set:{exercises: req.body}  
        })
       .then((dbworkout)=>{
         res.json(dbworkout)
       })
       .catch(err => {
           res.json(err);
         });
});

//create a workout
app.post("/api/workouts", (req, res)=>{
    //console.log(req.body);
    Workout.create({})
        .then((data)=> res.json(data))
        .catch((err) => { res.json(err);
        });
});

//getWorkoutsinRange
app.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .then(data =>{
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
});

db.once("open", function (){
    app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});