// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEdit = (task) => {
    setTaskToEdit(task);
  };

  const handleSave = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TaskForm taskToEdit={taskToEdit} onSave={handleSave} />
      <TaskList onEdit={handleEdit} />
    </div>
  );
};

export default App;
