import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

// Mock the TaskList and TaskForm components
jest.mock('./components/TaskList', () => ({ onEdit }) => (
  <div>
    <button onClick={() => onEdit({ id: 1, assignedTo: 'Alice', status: 'In Progress', dueDate: '2024-09-30', priority: 'High', comments: 'Urgent task' })}>Edit Task</button>
  </div>
));

jest.mock('./components/TaskForm', () => ({ taskToEdit, onSave }) => (
  <div>
    {taskToEdit ? <div>Editing Task: {taskToEdit.assignedTo}</div> : <div>No Task to Edit</div>}
    <button onClick={onSave}>Save Task</button>
  </div>
));

describe('App Component', () => {
  test('renders the component with TaskForm and TaskList', () => {
    render(<App />);
    
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    expect(screen.getByText('No Task to Edit')).toBeInTheDocument();
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
  });

  test('sets taskToEdit when Edit button is clicked', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Edit Task'));
    expect(screen.getByText('Editing Task: Alice')).toBeInTheDocument();
  });

  test('clears taskToEdit when Save button is clicked', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Edit Task'));
    fireEvent.click(screen.getByText('Save Task'));
    expect(screen.getByText('No Task to Edit')).toBeInTheDocument();
  });
});
