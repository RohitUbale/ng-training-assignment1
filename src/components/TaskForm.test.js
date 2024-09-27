import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskForm from './TaskForm';
import { getTasks, saveTasks } from '../services/taskService';

jest.mock('../services/taskService');

describe('TaskForm', () => {
  const mockOnSave = jest.fn();
  const mockTask = {
    id: '1',
    assignedTo: 'John Doe',
    status: 'In Progress',
    dueDate: '2023-09-30',
    priority: 'High',
    comments: 'Test comment'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with initial values', () => {
    render(<TaskForm taskToEdit={mockTask} onSave={mockOnSave} />);
    expect(screen.getByLabelText(/Assigned To/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Status/i)).toHaveValue('In Progress');
    expect(screen.getByLabelText(/Due Date/i)).toHaveValue('2023-09-30');
    expect(screen.getByLabelText(/Priority/i)).toHaveValue('High');
    expect(screen.getByLabelText(/Comments/i)).toHaveValue('Test comment');
  });

  test('handles input changes', () => {
    render(<TaskForm taskToEdit={mockTask} onSave={mockOnSave} />);
    fireEvent.change(screen.getByLabelText(/Assigned To/i), { target: { value: 'Jane Doe' } });
    expect(screen.getByLabelText(/Assigned To/i)).toHaveValue('Jane Doe');
  });

  test('submits the form', () => {
    getTasks.mockReturnValue([mockTask]);
    render(<TaskForm taskToEdit={mockTask} onSave={mockOnSave} />);
    fireEvent.submit(screen.getByRole('button', { name: /Save/i }));
    expect(saveTasks).toHaveBeenCalledWith([mockTask]);
    expect(mockOnSave).toHaveBeenCalled();
  });

  test('cancels the form', () => {
    render(<TaskForm taskToEdit={mockTask} onSave={mockOnSave} />);
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnSave).toHaveBeenCalled();
  });
});
