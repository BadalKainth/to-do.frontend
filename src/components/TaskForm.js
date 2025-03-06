import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, editTask, setEditTask }) => {
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (editTask) {
      // Edit existing task
      onAddTask({
        _id: editTask._id,
        title,
        completed: editTask.completed
      });
      setEditTask(null);
    } else {
      // Add new task
      onAddTask({ title });
    }
    
    setTitle('');
  };

  const handleCancel = () => {
    setTitle('');
    setEditTask(null);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="submit-btn">
        {editTask ? 'Update' : 'Add'}
      </button>
      {editTask && (
        <button 
          type="button" 
          onClick={handleCancel}
          className="cancel-btn"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;