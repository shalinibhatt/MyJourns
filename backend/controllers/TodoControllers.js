const Todo = require('../models/TodoSchema')


exports.addTodo= async (req,res)=>{
  try{
     const {title, tasks} = req.body;
     console.log(req.body);
     if((!title && !tasks)){
        res.send("All fields are required...");
        return;
     }

     let existingTodo = await Todo.findOne({title});
     if(existingTodo){
        res.status(401).send("This Todo Title already exists");
        return;
     }
   
    let myTaskArray = tasks.split(",");
    let todo = {
        title,
        tasks:myTaskArray,
    };

    let newTodo = await Todo.create(todo);
    res.status(200).json({
        success:true,
        message:"Todo create Successfuly",
        newTodo
    });

  }
  catch(e){
    console.log("Error in addTodo controller")
    console.log("ERROR: ", e)
   res.status(400).json({
    success:false, 
    message:"Todo unsuccessful controller",
    e,
   })
  }
}

exports.getTodos = async(req,res)=>{
    try{
        const todos = await Todo.find()
        res.status(200).json({
            success: true,
            message: "Todos fetched from the database",
            todos
        })
    }
    catch(error)
    {
        console.log("Error while fetching todos controllers")
        console.log("Error: ", error)
        res.status(500).json({
            success:false, 
            messageSrc: "Error in get todos controller", 
            error
        })
    }
}

exports.getTodo = async(req,res)=>{
  try {
    const {todoId} = req.params
    if(!todoId)
    {
        throw new Error("Todo id required to fetch the details")
    }
    if(typeof todoId !== "string")
    {
        throw new Error("Todo Id should of type string")
    }
    const todo = await Todo.findById(todoId)
    if(!todo)
    {
        throw new Error("Todo not found in Database")
    }


    res.status(200).json({
        success: true,
        message: "Todo fetched successfully",
        todo
    })



  } 
  catch(e)
  {
         console.log("Error in get todo controller")
        console.log("ERROR: ", e)
        res.status(400).json({
            success: false,
            message: "Error in get todo controller",
            e
        })
  }
  
}


// Add task only route 
exports.addTaskOnly = async(req,res)=>{
    try{
       const {tasks}=req.body;
       let todo = await Todo.findById(req.params.todoId);
       let newTasks=tasks.split(",");
       todo.tasks.push(...newTasks);

       let todos = await Todo.findByIdAndUpdate(req.params.todoId, todo);
       res.status(200).json({
        success: true,
        message: "Todo Task is updated",
        todos
       })
    }
    catch(error){
        console.log("Error in todo delete controller")
        console.log("Error: ", error)
        res.status(400).json({
            success:false,
            message: "Error in delete todo controller",
            error
        })
    }
}

// Edit title only
exports.editTitleOnly = async(req,res)=>{
    try{
      const {title}=req.body;
      let todo = await Todo.findById(req.params.todoId);
      todo.title = title;

      let todos = await Todo.findByIdAndUpdate(req.params.todoId , todo); 
      res.status(200).json({
        success: true, 
        message: "Title Updated successfully ", 
        todos,
      })


    }
    catch(error)
    {
      console.log("Error in Title edit todo controller")
      console.log("Error: ", error)
      res.status(400).json({
        success:false, 
        message: "Error in Edit Title controller", 
        error
      })
     }

}


exports.editTodo = async (req,res)=>{
  try{
    const {title, tasks} =req.body;
    let newTask = tasks.split(",");
    let newUpdatedTodo={
        title,
        tasks:newTask,
    }
    let todo= await Todo.findByIdAndUpdate(req.params.todoId, newUpdatedTodo);
    res.status(200).json({
        success: true,
        message: "TodoUpdated",
    })
  }
    catch(error){
       console.log("Error in edit todo controller")
        console.log("ERROR: ", error)
        res.status(400).json({
            success: false,
            messageSrc: "Error in edit todo controller",
            error
    })
 }
}

exports.deleteTodo = async (req,res)=>{
    try{
        const {todoId} = req.params;
        
    

        const todo = await Todo.findByIdAndDelete(todoId)
        res.status(200).json({
            success:true,
            message: "Todo deleted successfuly", 
            deleteTodo: todo,
        })
    

    }
    catch(error)
    {
        console.log("Error in todo delete controller")
        console.log("Error: ", error)
        res.status(400).json({
            success:false,
            message: "Error in delete todo controller",
            error
        })
    }
}



// search todo 
/**
 * destructure the req.query as data is coming from user )(search)
 * validate if search is there or not 
 * validate if type of string or not
 * find the title and tasks by using regex and $or 
 * send to frontend guy
 */
// exports.searchTodos = async (req,res)=>{
//     try{
//         const {search} = req.query  // if we want to pass the data in get method then we use query (as get means taking data from db)
//          if(!search)
//          {
//             throw new Error("Search value is missing")
//          }
//          if(typeof search!=='string')
//          {
//             throw new Error("Search value should be a type string")
//          }

// const todos=await Todo.find({ $or: [{title: new RegExp(search, 'i')}, {tasks: new RegExp(search, 'i')}] })
        
//          res.status(200).json({
//             succes: true,
//             todos
//          })
        
//      }

//      catch(e){
//   console.log("Error in search todos controller")
//   console.log('errro: ', e)
//   res.status(400).json({
//     succes:false,
//     message: "Error while searching controller"
//   })
//      }
// }