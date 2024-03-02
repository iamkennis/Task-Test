"use client";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [tasks, setTasks] = React.useState<any>([]);
  const [showModal, setShowModal] = React.useState<any>(false);
  const [taskToEdit, setTaskToEdit] = React.useState<any>("");
  const [editedTask, setEditedTask] = React.useState<any>("");
  const [newTask, setNewTask] = React.useState<any>("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTaskToEdit("");
    setEditedTask("");
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const editTask = (index: string | number) => {
    setTaskToEdit(index);
    setEditedTask(tasks[index].text);
    openModal();
  };

  const updateTask = () => {
    if (editedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[taskToEdit] = {
        text: editedTask,
        completed: tasks[taskToEdit].completed,
      };
      setTasks(updatedTasks);
      closeModal();
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleCheckbox = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
  };

  return (
    <main className="">
      <div className="grid grid-flow-col">
        <div className=" col-span-2 relative z-40">
          <div className="flex flex-row gap-4 px-8  h-[123px] justify-start py-6 bg-[#3556AB] shadow-gray-400">
            <div>
              <Image
                alt="man"
                objectFit="cover"
                src="/assets/user.png"
                width={50}
                height={50}
              />
            </div>
            <div className="text-white">
              <h3 className=" text-[16px]">Hello, Jhon</h3>
              <h4 className="text-[24px] font-thin italic w-[250px]">
                What are your plans for today?
              </h4>
            </div>
          </div>
          <div className="bg-[#9EB031] flex flex-row gap-4 px-8 min-h-[123px] justify-between">
            <div className="flex flex-row gap-4 items-center">
              <div>
                <Image
                  alt="man"
                  src="/assets/tropy.png"
                  width={54}
                  height={54}
                />
              </div>
              <h4 className="text-[#071D55] text-[16px] font-bold">
                Go Pro Upgrade Now
              </h4>
            </div>
            <div className="w-[66px] h-[71px] bg-[#071D55]">
              <h1 className="text-[#F2C94C] px-6 py-6 text-[16px] font-medium">
                $1
              </h1>
            </div>
          </div>
          <div className="p-2 space-y-4">
            {tasks.map((task: any, index: any) => (
              <div
                key={index}
                className=" h-[91px] bg-[#00000025] flex flex-row justify-between items-center px-4 rounded-md"
              >
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="customStyle"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-[#071D55] bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#399649] checked:bg-[#49C25D] checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                    id="customStyle"
                    checked={task.completed}
                    onChange={() => toggleCheckbox(index)}
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="#399649"
                      stroke="#399649"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <p className={task.completed ? 'line-through text-gray-600' : "text-black"}>{task.text}</p>
                <button
                  className="bg-white border-[#071D55] w-[51px] h-[45px] border"
                  onClick={() => editTask(index)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
          <div className="absolute right-0 bottom-2-">
           <button
              className="bg-[#123EB1] border border-[#0D2972] w-[60px] h-[60px] rounded-full"
              onClick={openModal}
            >
              <h1 className="text-xl text-white py-4 px-6">+</h1>
            </button>
           </div>
        </div>
      
        {showModal && (
          <div className="col-span-6 relative z-0">
            <div className="h-[123px] bg-[#3556AB]">
              <h3 className="text-[24px] text-center font-semibold py-8 text-white">
                {taskToEdit === "" ? "Add Task" : "Edit Task"}
              </h3>
            </div>
            <div className="flex flex-col">
              <div className="px-4 pt-4 space-y-2">
                <h3 className="text-[16px]">Task Name</h3>
                <input
                  type="text"
                  className="w-[400px] h-[49px] border-2 border-[#CBCBCB] rounded-md px-2 outline-none"
                  value={taskToEdit === "" ? newTask : editedTask}
                  onChange={(e) =>
                    taskToEdit === ""
                      ? setNewTask(e.target.value)
                      : setEditedTask(e.target.value)
                  }
                  placeholder={taskToEdit === "" ? "Add Tasks" : "Edit Task"}
                />
              </div>
              <div className="flex flex-row gap-6 items-center mt-[360px] px-4 py-4">
                <button
                  className="bg-[#AB3535] border border-[#720D0D] w-[121px] h-[41px] rounded-[6px] text-white text-[18px]"
                  onClick={() => deleteTask(taskToEdit)}
                >
                  Delete
                </button>
                <button
                  className="bg-[#3556AB] border border-[#0D2972] w-[463px] h-[41px] rounded-[6px] text-white text-[18px]"
                  onClick={taskToEdit === "" ? addTask : updateTask}
                >
                  {taskToEdit === "" ? "Add" : "Save"}
                </button>
               {taskToEdit !== '' && <button
                  className="bg-[#9e9c21] border border-[#708122] w-[121px] h-[41px] rounded-[6px] text-white text-[18px]"
                  onClick={closeModal}
                >
                  Close
                </button>}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
