import { useState } from 'react';
import './AppTodo.css';

import { TodoHeader, TodoList, TodoInput } from './components';
import DarkModeProvider from './context/DarkModeProvider';

const initialData = [
  { id: Date.now(), content: 'HTML', isChecked: false },
  { id: Date.now() + 2, content: 'CSS', isChecked: true },
  { id: Date.now() + 3, content: 'JavaScript', isChecked: false },
];

const getTodoList = () => {
  return JSON.parse(localStorage.getItem('todoList')) ?? initialData;
};

function App() {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState(getTodoList());

  const handleList = (e) => {
    const list = e.target.closest('li');

    if (e.target.matches('input[type="checkbox"]')) {
      const changeIsChecked = data.map((data) =>
        data.id === +list.dataset.id
          ? { ...data, id: Date.now(), isChecked: !data.isChecked }
          : data
      );
      setData(changeIsChecked);
      localStorage.setItem('todoList', JSON.stringify(changeIsChecked));
    }

    if (e.target.closest('button')) {
      const deleteTodo = data.filter(({ id }) => id !== +list.dataset.id);
      setData(deleteTodo);
      localStorage.setItem('todoList', JSON.stringify(deleteTodo));
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefalut();
    const value = e.text.value.trim();

    if (value === '') return;
    const addTodo = [
      ...data,
      { id: Date.now(), content: value, isChecked: false },
    ];
    setData(addTodo);
    localStorage('todoList', addTodo);
  };
  const handleFilter = (e) => {
    if (!e.target.matches('ul > li')) return;
    setFilter(e.target.textContent.toLowerCase());
  };

  return (
    <section className='todo'>
      <DarkModeProvider>
        <TodoHeader filter={filter} onClick={handleFilter} />
        <TodoList data={data} onClick={handleList} />
        <TodoInput onSubmit={handleAddTodo} />
      </DarkModeProvider>
    </section>
  );
}

export default App;
