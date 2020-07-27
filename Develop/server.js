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

// API.JS ROUTES GO HERE ===========
//do I need this?
app.get("/", (req, res)=>{
    //think i have to send a file to this site.
    //send a path or a html file...?
    //Object Document Mapper = MangoDo
});

//get last workout
app.get("/api/workouts", (req, res) => {
    Workout.find({}).then(data =>{
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    });
    
    //res.json({data: "Hello"});
});

//looks like there is a app.put for the same /api/workouts
//put - update
//post - add it
app.post("/api/workouts/:id", (req, res)=>{

    console.log(req.body);
    res.send(res.body);
    const { day, exercise, type, name, weight, duration } = req.body;
    
    // Workout.update(
    // {
    //     _id: mongojs.ObjectId(req.params.id)
    // },
    // {
    //  $set: 
    //     { 
    //     type: req.body.type, 
    //     name: req.body.name,
    //     weight: req.body.weight
    //     }
        
    //          body??? ///WHAT?// IDENTIFY WHERE  ADD EXERCISE, iD what code is triggered. 
    //     model definte document in MOngo. 
    //     still need to wrap data in model. 
    //     need to create model object and then save to databse
    // }
    // ), (err, data) => {
    // if (err){
    //     console.log(err);
    // }else{
    //     res.send(data);
    // }};

});

//create a workout
app.post("/api/workouts", (req, res)=>{
    Workout.insert({body}, (err, data) =>{
        if (err){

        }else {
            res.json(data);
        }
    });  

});

//getWorkoutsinRange
app.get("/api/workouts/range", (req, res) => {
    Workout.find({}, (err, data)=>{
        res.json(data);

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




db.once("open", function (){
    app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
});