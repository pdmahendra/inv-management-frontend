import ListItem from "./ListItem";
import FormDialog from "./AddItem";
import React, { useEffect, useState } from "react";
import axios from "../../utils/middleware";
import { SERVER_BASE_URL } from "../../api/index";

const Todays = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/todo/get-tasks`
      );
      const filteredTasks = response.data.tasks.filter(
        (task) => task.todo_type === "todo3"
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    const newTask = {
      title,
      description,
      todo_type: "todo3",
    };

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/todo/addTask`,
        newTask
      );
      setTasks([...tasks, response.data.task]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="pr-2 w-80">
      <div>
        <div className="flex justify-between items-center pr-2 text-xl font-medium">
          <h1 className="">Todays notes</h1>
          <div className="flex items-center gap-4">
            <FormDialog
              title={title}
              description={description}
              setTitle={setTitle}
              setDescription={setDescription}
              addTask={addTask}
            />{" "}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 md:mt-14">
        <ul>
          {tasks.map((t) => (
            <ListItem
              key={t._id}
              id={t._id}
              status={t.status}
              title={t.title}
              description={t.description}
              getTasks={getTasks}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todays;
