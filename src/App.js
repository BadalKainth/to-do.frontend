import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import "./App.css";

const API_BASE_URL = "https://to-do-backend-tdld.onrender.com/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task or update an existing one
  const handleAddTask = async (task) => {
    try {
      if (task._id) {
        // Update existing task
        const response = await fetch(`${API_BASE_URL}/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        const updatedTask = await response.json();
        setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
      } else {
        // Add new task
        const response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) {
          throw new Error("Failed to add task");
        }

        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle task completion status
  const handleCompleteTask = async (id) => {
    try {
      const task = tasks.find((task) => task._id === id);

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>To-Do List</h1>

        <TaskForm
          onAddTask={handleAddTask}
          editTask={editTask}
          setEditTask={setEditTask}
        />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="no-tasks">No tasks yet! Add one above.</div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                  onEdit={setEditTask}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
