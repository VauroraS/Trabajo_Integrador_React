import { useState, useEffect } from 'react';
import './App.css';
import Input from './components/Input';
import TaskList from './components/TaskList';
import Search from './components/SearchBar';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid

function getTasksFromStorage() {
  const storedTasks = window.localStorage.getItem("tasks");
  const tasks = JSON.parse(storedTasks);
  return tasks ? tasks : [];
}

function App() {
  const [tasks, setTasks] = useState(getTasksFromStorage());
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  

  // Función para agregar una nueva tarea
  const handleAddTask = (description) => {
    const newTask = {
      id: uuidv4(), // Generar id único con uuid
      description: description,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
    setFilteredTasks([...filteredTasks, newTask]);
  };

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Función para borrar una tarea
  const handleDelete = (id) => {
    const remainingTasks = tasks.filter(t => t.id !== id);
    setTasks([...remainingTasks]);
    setFilteredTasks([...remainingTasks]);
  };

  // Función para cambiar el valor de isCompleted
  const handleChangeStatus = (id) => {
    const modifiedTasks = tasks.map(t =>
      t.id === id ?
        { ...t, isCompleted: !t.isCompleted }
        :
        t
    );
    setTasks([...modifiedTasks]);
    setFilteredTasks([...modifiedTasks]);
  };

  // Función para manejar la búsqueda
  const handleSearchQuery = (query) => {
    
    const queryResult = tasks.filter(t => t.description.toLowerCase().includes(query.toLowerCase()));
    setFilteredTasks(queryResult);
  };

  return (
    <main className='container'>
      <h1>Lista de Tareas</h1>
      <Search onSearch={query => handleSearchQuery(query)} />
      <Input onAddTask={(description) => handleAddTask(description)} />
      {tasks &&
        <TaskList
          onDeleteTask={(id) => handleDelete(id)} tasks={filteredTasks}
          onChangeStatus={(id) => handleChangeStatus(id)}
        />
      }
    </main>
  );
}

export default App;
