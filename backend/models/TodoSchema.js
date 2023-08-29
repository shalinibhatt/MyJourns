const mongoose = require("mongoose")

/*
Destructure the mongoose 
-Schema Contructor 
*/
 const {Schema,model}=mongoose; 

/**
 * TodoSchema: Creating a schema for Todo
 * - title : String value , Its required 30char
 * - tasks: It is a collection of Array of string values, any value is passed is converted into string
 * - isImportant: It is a flag use to prioritize todo, stores boolean value
 
 */


 const TodoSchema = new Schema({
    title: {
        type: String, 
        unique:true,
        required: [true, "Title of the todo is required"], 
        maxLength: [30, "Max length of the title is atmost 30 char.."],
        trim: true
    }, 
    tasks:[String] ,
   
 }
 )

 module.exports = model("todo", TodoSchema);