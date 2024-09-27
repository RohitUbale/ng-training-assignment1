import React, { useState, useEffect } from 'react';
import { getTasks, saveTasks } from '../services/taskService';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit, onDelete }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
