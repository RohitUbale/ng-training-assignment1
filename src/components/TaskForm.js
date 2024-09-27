import React, { useState, useEffect } from 'react';
import { getTasks, saveTasks } from '../services/taskService';

const TaskForm = ({ taskToEdit, onSave }) => {
  const [task, setTask] = useState({ id: '', assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tasks = getTasks();
    if (task.id) {
      const updatedTasks = tasks.map(t => (t.id === task.id ? task : t));
      saveTasks(updatedTasks);
    } else {
      task.id = Date.now();
      saveTasks([...tasks, task]);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>
        Assigned To:
        <input type="text" name="assignedTo" value={task.assignedTo} onChange={handleChange} required />
      </label>
      <label>
        Status:
        <select name="status" value={task.status} onChange={handleChange} required>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Due Date:
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
      </label>
      <label>
        Priority:
        <select name="priority" value={task.priority} onChange={handleChange} required>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </label>
      <label>
        Comments:
        <textarea name="comments" value={task.comments} onChange={handleChange}></textarea>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => onSave()}>Cancel</button>
    </form>
  );
};

export default TaskForm;
