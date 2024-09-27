import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskItem from './TaskItem';
import ConfirmDelete from './confirmDelete';

// Mock the ConfirmDelete component
jest.mock('./ConfirmDelete', () => ({ onConfirm }) => (
  <div>
    <button onClick={() => onConfirm(false)}>No</button>
    <button onClick={() => onConfirm(true)}>Yes</button>
  </div>
));

describe('TaskItem Component', () => {
  const mockTask = {
    id: 1,
    assignedTo: 'Alice',
    status: 'In Progress',
    dueDate: '2024-09-30',
    priority: 'High',
    comments: 'Urgent task'
  };

  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();

  test('renders the component with task details', () => {
    render(<TaskItem task={mockTask} onEdit={onEditMock} onDelete={onDeleteMock} />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('2024-09-30')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Urgent task')).toBeInTheDocument();
  });

  test('calls onEdit when Edit button is clicked', () => {
    render(<TaskItem task={mockTask} onEdit={onEditMock} onDelete={onDeleteMock} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(onEditMock).toHaveBeenCalledWith(mockTask);
  });

  test('shows confirm delete dialog when Delete button is clicked', () => {
    render(<TaskItem task={mockTask} onEdit={onEditMock} onDelete={onDeleteMock} />);
    
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('calls onDelete with task id when Yes is clicked in confirm delete dialog', () => {
    render(<TaskItem task={mockTask} onEdit={onEditMock} onDelete={onDeleteMock} />);
    
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Yes'));
    expect(onDeleteMock).toHaveBeenCalledWith(mockTask.id);
  });

  test('does not call onDelete when No is clicked in confirm delete dialog', () => {
    render(<TaskItem task={mockTask} onEdit={onEditMock} onDelete={onDeleteMock} />);
    
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('No'));
    expect(onDeleteMock).not.toHaveBeenCalled();
  });
});
