"use client";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { EditTask } from "./EditTask";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");

  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  if (!user && !userSession) {
    router.push("/signin");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      setTasks([...tasks, { text: value, completed: false }]);
      setValue("");
    }
  };
  const toggleEdit = (index) => {
    setTasks(
      tasks.map((t, i) => (index === i ? { ...t, isEditing: !t.isEditing } : t))
    );
  };
  const toggleDelete = (index) => {
    setTasks(tasks.filter((t, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleDeleteAll = () => {
    setTasks(tasks.filter((t, i) => (i ? t.length : "")));
  };

  const handleUpdate = (index, updatedText) => {
    setTasks(
      tasks.map((t, i) =>
        index === i ? { ...t, text: updatedText, isEditing: false } : t
      )
    );
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute top-0 right-0 md:m-4 m-4">
        <button
          className="text-xs md:text-sm font-medium md:tracking-wide"
          onClick={() => {
            signOut(auth);
            sessionStorage.removeItem("user");
          }}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col justify-center items-center p-16 rounded-sm">
        <div className="m-4">
          <h1 className="text-center font-medium uppercase tracking-widest text-3xl py-1">
            TO-DO APP
          </h1>
          <p className="text-xs text-center text-gray-500">by Jethro Peña</p>
        </div>
        <form
          className="flex flex-col md:flex md:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            className="border rounded-sm md:p-1 p-[2px]"
            type="text"
            placeholder="What task?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="md:mx-1 my-2 md:my-0 md:p-[5px] p-[6px] hover:scale-95 shadow-sm rounded-sm bg-sky-400 text-white text-xs md:text-sm w-fit md:w-full duration-200"
            type="submit"
          >
            Add Task
          </button>
        </form>
        <div className="m-2 p-4 w-full">
          <div
            className={`flex my-2 ${
              tasks.length > 1 ? "justify-between" : "justify-center"
            }`}
          >
            <h2 className="m-1 font-medium text-center">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-xs md:text-lg">Empty Task!</p>
              ) : (
                <p className="text-gray-800 text-xs md:text-lg">
                  Your task today!
                </p>
              )}
            </h2>
            {tasks.length > 1 ? (
              <button
                className="md:px-2 px-1 py-1 duration-200 hover:scale-95 shadow-sm rounded-sm bg-rose-500 w-fit text-white text-xs md:text-sm"
                onClick={toggleDeleteAll}
              >
                Delete All
              </button>
            ) : (
              ""
            )}
          </div>
          <div>
            {tasks.map((task, index) =>
              task.isEditing ? (
                <div>
                  <EditTask
                    task={task}
                    key={index}
                    onCancel={() => toggleEdit(index)}
                    onUpdate={(updatedText) => handleUpdate(index, updatedText)}
                  />
                </div>
              ) : (
                <div key={index} className="flex w-full justify-between py-2">
                  <div>
                    <p
                      onClick={() => toggleComplete(index)}
                      className={`cursor-pointer md:text-lg text-xs ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {index + 1}. {task.text}
                    </p>
                  </div>
                  <div className="px-4 flex items-center">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => toggleEdit(index)}
                      className="px-[9px] cursor-pointer w-3 h-3 md:w-4 md:h-4 text-emerald-500"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => toggleDelete(index)}
                      className="px-[9px] cursor-pointer w-3 h-3 md:w-4 md:h-4 text-rose-500"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
