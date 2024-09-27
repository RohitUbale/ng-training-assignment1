import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmDelete from './confirmDelete';

describe('ConfirmDelete Component', () => {
  test('renders the component with correct text', () => {
    render(<ConfirmDelete onConfirm={() => {}} />);
    
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Do you want to delete this task?')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  test('calls onConfirm with false when No button is clicked', () => {
    const onConfirmMock = jest.fn();
    render(<ConfirmDelete onConfirm={onConfirmMock} />);
    
    fireEvent.click(screen.getByText('No'));
    expect(onConfirmMock).toHaveBeenCalledWith(false);
  });

  test('calls onConfirm with true when Yes button is clicked', () => {
    const onConfirmMock = jest.fn();
    render(<ConfirmDelete onConfirm={onConfirmMock} />);
    
    fireEvent.click(screen.getByText('Yes'));
    expect(onConfirmMock).toHaveBeenCalledWith(true);
  });
});
