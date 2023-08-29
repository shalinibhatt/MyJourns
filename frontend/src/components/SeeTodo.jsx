// Here taking data from the database
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import uuid from 'react-uuid';
const SeeTodo = () => {

  const [todos, setTodos] = useState([]); 

  const BaseUrl = "https://myjourns.onrender.com";
  // const BaseUrl = "http://localhost:3000";

  const showTodo = async()=>{
    let { data } = await axios.get(`${BaseUrl}/gettodos`);
    console.log(data.todos); 
    setTodos(data.todos); 

  }




  useEffect( ()=>{
    showTodo();
  } , []);


  const editTitle = async(todoId)=>{
  let todoTitle = prompt("Enter New Title");
  if(!todoTitle)
  {
    alert("Title required");
    return;
  }
  let data = {
    title: todoTitle,
  }
  
  await axios.put(`${BaseUrl}/editTitleOnly/${todoId}`, data); 
  showTodo();

  }
// it is comment 

  const addTask=async (id)=>{
   let todoTasks = prompt("Enter New Tasks");
   if(!todoTasks)
   {
    alert("Task required"); 
    return;
   }

   let data={
    tasks: todoTasks,
   }

   await axios.put(`${BaseUrl}/addtaskonly/${id}`,data);
   showTodo();
  }

 const editTodo=async (id)=>{
   let todoTitle = prompt("Enter new Title"); 
  let todoTasks = prompt("Enter new Tasks..."); 
  if(!(todoTitle && todoTasks))
  {
    alert("Title and tasks both are required field");
    return;
  }
  let data={
    title: todoTitle, 
    tasks: todoTasks,
  }

  await axios.put(`${BaseUrl}/edittodo/${id}`, data);
  showTodo();
 }

 const deleteTodo= async(id)=>{
  await axios.delete(`${BaseUrl}/detetetodo/${id}`);
  alert("Todo deleted successfuly");
  showTodo();
 };



  return (
    <>
    <div className=''>
      {todos? (
        todos.map((todo) => (
          <section className='m-auto py-5' key={uuid()}>
            <div className='bg-blue-200 p-8 rounded-2xl'>
              <h1 className='text-center my-4 font-bold text-xl uppercase'>
                Title:   &nbsp;
                 {todo.title}
              </h1>
              <div className='flex gap-4 justify-center'>
                <button
                  className='bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline tracking-wider'
                  onClick={() => {
                    editTitle(todo._id);
                  }}
                >
                  Edit Title
                </button>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline tracking-wider'
                  onClick={() => {
                    addTask(todo._id);
                  }}
                >
                  Add Task
                </button>
                <button
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline tracking-wider'
                  onClick={() => {
                    editTodo(todo._id);
                  }}
                >
                  Edit Todo
                </button>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline tracking-wider'
                  onClick={() => {
                    deleteTodo(todo._id);
                  }}
                >
                  Delete Todo
                </button>
              </div>
              <div className='py-4 flex flex-col items-center'>
                {todo.tasks.map((task, index) => (
                  <div key={uuid()} className='w-[50vh] bg-purple-100 px-4 pt-2'>
                    <p className='text-gray'>
                      <span className='font-bold'>Task {index + 1}:</span> {task}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))
      ) : (
        <h1 className='text-black text-center pt-8 font-bold'>Create a To-do to see your first Task!</h1>
      )}
    </div>
  </>
);
}

export default SeeTodo;