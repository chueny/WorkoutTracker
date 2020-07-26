const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema (
    {
    day: {type: Date, default: Date.now},
    exercise: [
    { name:{
        type: String, 
        trim: true
    },
    type:{
        type: String,
        trim: true
    },
    name:{
        type: String,
        trim: true
    },
    weight:{
        type: Number
    },
    sets: {
        type: Number
    },
    repts: {
        type: Number
    },
    duration:{
        type: Number
    },
    distance:{
        type: Number
    }
    }]   
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
