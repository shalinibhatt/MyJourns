import React, { useState } from "react";
import axios from "axios";

const AddingTodo = () => {
  const BaseUrl = "http://localhost:3000";

  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const handlePromise = async (promise) => {
    let data, error;
    try {
      data = await promise;
    } catch (err) {
      error = err.message;
    }
    return [data, error];
  };

  const sendData = async () => {
    if (!(title && task)) {
      alert("Enter Title and tasks");
      return;
    }
    const todo = {
      title,
      tasks: task,
    };

    const [, error] = await handlePromise(
      axios.post(`${BaseUrl}/addtodo`, todo)
    );
    if (!error) {
      alert("Todo Added, Click on See Todo to See All the Todos");
    }
    if (error) {
      alert("Todo Not Created, Error Occured!!!");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sendData();
    setTask("");
    setTitle("");
  };

  return (
    <div className="h-[100vh]">
      <div className="p-2 h-[70vh]">
        <section className="w-[90%] m-auto my-10">
          <div className="flex flex-col gap-8 bg-blue-200 p-8 rounded-lg">
            <form action="" onSubmit={submitHandler}>
              {/* for add title */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <label htmlFor="" className="text-gray-700 font-bold text-2xl">
                    Add Title
                  </label>
                  <input
                    type="text"
                    placeholder="Add your title here"
                    className="border-b-2 outline-none px-2"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* for add tasks */}
                <div>
                  <h2 className="text-gray-700 font-bold text-2xl">
                    Add your tasks here
                  </h2>
                  <textarea
                    id=""
                    cols="80"
                    rows="6"
                    className="border-2 outline-none p-2 my-2"
                    placeholder="Add your tasks here..."
                    type="text"
                    name="tasks"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />

                  <h3 className="text-gray-700 font-bold">
                    Kindly add comma (,) for multiple tasks eg:
                    Badminton,Gym
                  </h3>
                </div>

                {/* adding button */}
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline lg:tracking-wider"
                    type="submit"
                  >
                    Add Todo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddingTodo;
