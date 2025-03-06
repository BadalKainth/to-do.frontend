import React from 'react';

const TaskItem = ({ task, onDelete, onComplete, onEdit }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task._id)}
          className="task-checkbox"
        />
        <span className={task.completed ? 'completed-text' : ''}>
          {task.title}
        </span>
      </div>
      <div className="task-actions">
        <button 
          onClick={() => onEdit(task)} 
          className="edit-btn"
          disabled={task.completed}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)} 
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;