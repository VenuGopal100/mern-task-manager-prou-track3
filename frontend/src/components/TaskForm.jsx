import { useEffect, useState } from "react";

export default function TaskForm({ initialTask, onSave, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  // ✅ Pre-fill or reset form when editing task changes
  useEffect(() => {
    const nextState = {
      title: initialTask?.title || "",
      description: initialTask?.description || "",
      priority: initialTask?.priority || "Low",
      dueDate: initialTask?.dueDate
        ? new Date(initialTask.dueDate).toISOString().slice(0, 10)
        : ""
    };

    setTitle(nextState.title);
    setDescription(nextState.description);
    setPriority(nextState.priority);
    setDueDate(nextState.dueDate);
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate ? new Date(dueDate) : null
    };

    if (initialTask?._id) {
      payload._id = initialTask._id;
    }

    onSave(payload);
  };

  const isEditing = Boolean(initialTask?._id);

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          className="input"
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>

        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <textarea
        className="textarea"
        rows={3}
        placeholder="Description / notes (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="form-actions">
        <button type="submit" className="btn primary">
          {isEditing ? "Update Task" : "Add Task"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="btn secondary"
            onClick={onCancelEdit}
          >
            Cancel edit
          </button>
        )}
      </div>
    </form>
  );
}
