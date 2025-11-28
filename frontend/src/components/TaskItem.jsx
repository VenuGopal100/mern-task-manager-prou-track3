export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const priority = (task.priority || "Low").toLowerCase();

  const dueDateLabel = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No due date";

  return (
    <div className={`task-card priority-${priority}`}>
      <div>
        <div className="card-title-row">
          <h3 className={task.completed ? "card-title done" : "card-title"}>
            {task.title}
          </h3>

          <span className={`badge badge-${priority}`}>
            {task.priority || "Low"}
          </span>
        </div>

        {task.description && (
          <p className="card-description">{task.description}</p>
        )}

        <p className="card-meta">
          Due: <strong>{dueDateLabel}</strong> ·{" "}
          {task.completed ? "Completed ✅" : "Pending ⏳"}
        </p>
      </div>

      <div className="card-actions">
        <button className="btn ghost" onClick={onToggle}>
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>
        <button className="btn ghost" onClick={onEdit}>
          Edit
        </button>
        <button className="btn danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
