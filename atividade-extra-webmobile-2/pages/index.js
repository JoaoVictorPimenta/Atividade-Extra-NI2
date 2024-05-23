import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../pages/components/Task';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTaskText.trim()) return;

    try {
      await axios.post('/api/tasks', { text: newTaskText, completed: false });
      setNewTaskText('');
      fetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onTaskUpdate={fetchTasks} />
        ))}
      </div>
    </div>
  );
}
