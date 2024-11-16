import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import TodoImg from "/Checklist2.png";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const inputRef = useRef(null);
  const taskListRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const addTask = () => {
    if (!isAuthenticated) {
      alert("Please log in to add tasks.");
      navigate("/login");
      return;
    }

    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false, isDeleting: false }]);
      setTaskInput("");
      taskListRef.current.scrollTop = taskListRef.current.scrollHeight;
    }
  };

  const editTask = (index) => {
    setEditingTaskIndex(index);
    setTaskInput(tasks[index].text);
  };

  useEffect(() => {
    if (editingTaskIndex !== null) {
      inputRef.current.focus();
    }
  }, [editingTaskIndex]);

  const saveEditedTask = () => {
    if (taskInput.trim() && editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex].text = taskInput;
      setTasks(updatedTasks);
      setTaskInput("");
      setEditingTaskIndex(null);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isDeleting = true;
    setTasks(updatedTasks);

    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
    }, 300);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:space-x-12 p-6 max-w-5xl mx-auto my-12">
      {/* Left side with Image */}
      <div className="w-full md:w-1/2 h-full flex justify-center md:justify-start mb-6 md:mb-0">
        <img
          src={TodoImg}
          alt="Illustration for Todo"
          className="object-cover w-3/4 md:w-full h-auto rounded-lg"
        />
      </div>

      {/* Right side with Todo box */}
      <div className="bg-white border-black border-2 shadow-lg w-full md:w-1/2 h-full rounded-2xl p-7 flex flex-col">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faClipboardList} className="h-8 w-8 mr-4" />
          <h1 className="font-semibold text-2xl">To-Do List</h1>
        </div>

        {/* Input and Add/Save button */}
        <div className="flex mb-4">
          <TextField
            className="flex-grow"
            id="fullWidth"
            placeholder="Add a task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            inputRef={inputRef}
            disabled={!isAuthenticated} // Disable input if not authenticated
            sx={{
              "& .MuiOutlinedInput-root": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              },
            }}
          />
          <button
            onClick={editingTaskIndex !== null ? saveEditedTask : addTask}
            className={`font-bold transition-colors duration-200 py-2 px-4 rounded-r-lg ${
              isAuthenticated
                ? "bg-[#68E1FD] text-black hover:bg-black hover:text-[#68E1FD]"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!isAuthenticated} // Disable button if not authenticated
          >
            {editingTaskIndex !== null ? "Save" : "ADD"}
          </button>
        </div>

        {/* Scrollable Task List */}
        <div
          ref={taskListRef}
          className="overflow-y-auto max-h-[60vh] mb-4"
        >
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between mb-2 transition-transform ${task.isDeleting ? "slide-out" : ""}`}
              >
                {/* Checkbox for marking task completion */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    className="cursor-pointer accent-true-blue"
                  />
                  <span className={`flex-grow ${task.completed ? "line-through text-gray-400" : ""}`}>
                    {task.text}
                  </span>
                </div>
                {/* Edit and Delete icons */}
                <div className="flex space-x-2">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="cursor-pointer text-blue-500"
                    onClick={() => editTask(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteTask(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
