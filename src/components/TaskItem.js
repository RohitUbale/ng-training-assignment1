import React, { useState } from 'react';
import ConfirmDelete from './confirmDelete';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = (confirm) => {
    setShowConfirm(false);
    if (confirm) {
      onDelete(task.id);
    }
  };

  return (
    <tr>
      <td>{task.assignedTo}</td>
      <td>{task.status}</td>
      <td>{task.dueDate}</td>
      <td>{task.priority}</td>
      <td>{task.comments}</td>
      <td>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        {showConfirm && <ConfirmDelete onConfirm={confirmDelete} />}
      </td>
    </tr>
  );
};

export default TaskItem;
