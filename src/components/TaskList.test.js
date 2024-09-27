import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskList from './TaskList';
import { getTasks, saveTasks } from '../services/taskService';

// Mock the task service functions
jest.mock('../services/taskService');

describe('TaskList Component', () => {
  const mockTasks = [
    { id: 1, assignedTo: 'Alice', status: 'In Progress', dueDate: '2024-09-30', priority: 'High', comments: 'Urgent task' },
    { id: 2, assignedTo: 'Bob', status: 'Completed', dueDate: '2024-09-25', priority: 'Low', comments: 'Completed ahead of time' },
  ];

  beforeEach(() => {
    getTasks.mockReturnValue(mockTasks);
    saveTasks.mockClear();
  });

  test('renders the component with tasks', () => {
    render(<TaskList onEdit={() => {}} onDelete={() => {}} />);
    
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  test('calls getTasks on component mount', () => {
    render(<TaskList onEdit={() => {}} onDelete={() => {}} />);
    
    expect(getTasks).toHaveBeenCalled();
  });

  test('handles delete task', () => {
    render(<TaskList onEdit={() => {}} onDelete={() => {}} />);
    
    fireEvent.click(screen.getAllByText('Delete')[0]);
    
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(saveTasks).toHaveBeenCalledWith([mockTasks[1]]);
  });
});
