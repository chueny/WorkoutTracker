const express = require("express");
const logger = require("morgan"); // do not think we need this
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 8001;

const Workout = require("./Develop/workoutModel.js");

const app = express();

app.use(logger("dev")); 

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });

// API.JS ROUTES GO HERE ===========
//do I need this?
app.get("/", (req, res)=>{
//think i have to send a file to this site.

});

//get last workout
app.get("/api/workouts", (req, res) => {
    console.log("Hello", res);
    Workout.find({}).then(data =>{
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });

});

//looks like there is a app.put for the same /api/workouts
app.put("/api/workouts", (req, res)=>{

//update the workout
    Workout.update({
    //what specifically?
    }), (err, data) => {
    if (err){
        console.log(err);
    }else{
        res.send(data);
    }};

});

//create a workout
app.post("/api/workouts", (req, res)=>{
    Workout.insert(body, (err, data) =>{
        if (err){

        }else {
            res.json(data);
        }
    });  

});

//getWorkoutsinRange
app.get("/api/workouts/range", (req, res) => {
    Workout.find({}, (err, data)=>{


    });
});

//exercise.js ROUTES GO HERE =======
//is this a app.post for initExercise
app.post("/:id", (req, res)=>{
    Workout.update()

});


//index.js ROUTES GO HERE ===========
app.get("/:id", (req,res)=>{
    Workout.find(
        {
            _id: mongojs.ObjectId(req.params.id)
        },(err, data) =>{
            if (err){
                console.log(err);
            } else{
                res.send(data);
            }
        });
});

//stats.js ROUTES GO HERE ========
//getlastwOrkout

app.get("/exercise/:id", (req, res)=>{

    Workout.find({_id: mongojs.ObjectId(req.param.id)}, (err, data) => {

    });

});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
