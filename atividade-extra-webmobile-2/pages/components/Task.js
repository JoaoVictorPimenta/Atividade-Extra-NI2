import { useState } from 'react';
import axios from 'axios';

export default function Task({ task, onTaskUpdate }) {
  const [completed, setCompleted] = useState(task.completed);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks?id=${task.id}`);
      onTaskUpdate();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleCompleted = async () => {
    try {
      await axios.put(`/api/tasks?id=${task.id}`, { ...task, completed: !completed });
      setCompleted(!completed);
      onTaskUpdate();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <span>{task.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
