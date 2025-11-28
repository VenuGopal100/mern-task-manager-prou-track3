import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import "./index.css";

const API_URL = "http://localhost:5000/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // task being edited

  // load tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  // create or update task
  const saveTask = async (taskData) => {
    try {
      if (taskData._id) {
        // update existing
        const res = await fetch(`${API_URL}/${taskData._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData)
        });
        const updated = await res.json();
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
      } else {
        // create new
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData)
        });
        const created = await res.json();
        setTasks((prev) => [...prev, created]);
      }
      setEditingTask(null);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // toggle completed
  const toggleTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed })
      });
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updated : t))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  // delete
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="page">
      <div className="app-shell">
        <header className="header">
          <h1>MERN Task Manager</h1>
          <p className="subtitle">
            Create, edit and track your tasks with priority & due dates.
          </p>
        </header>

        <TaskForm
          key={editingTask ? editingTask._id : "new"}
          initialTask={editingTask}
          onSave={saveTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <div className="cards-grid">
          {tasks.length === 0 && (
            <p className="empty-state">
              No tasks yet. Add your first one above ✨
            </p>
          )}

          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={() => toggleTask(task)}
              onDelete={() => deleteTask(task._id)}
              onEdit={() => setEditingTask(task)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
