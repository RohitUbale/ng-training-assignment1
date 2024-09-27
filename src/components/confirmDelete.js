import React from 'react';

const ConfirmDelete = ({ onConfirm }) => {
  return (
    <div className="confirm-delete">
      <div className="confirm-delete-header">Delete</div>
      <p>Do you want to delete this task?</p>
      <button className="no" onClick={() => onConfirm(false)}>No</button>
      <button className="yes" onClick={() => onConfirm(true)}>Yes</button>
    </div>
  );
};

export default ConfirmDelete;
