import React, { useState, useEffect } from 'react';
import './list.css';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!task) return;
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setTask(task.text);
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map((t) => 
      t.id === currentTask.id ? { ...t, text: task } : t
    ));
    setIsEditing(false);
    setTask('');
    setCurrentTask(null);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((t) => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        {isEditing ? (
          <button onClick={handleUpdateTask}>Update Task</button>
        ) : (
          <button onClick={handleAddTask}>Add Task</button>
        )}
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <div className="buttons">
              {!task.completed && (
                <button onClick={() => handleEditTask(task)}>Edit</button>
              )}
              <button className="delete" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
