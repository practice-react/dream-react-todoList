import React, { useContext, useState } from 'react';
import styles from '../styles/TodoList.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { DarkModeContext } from '../context/DarkModeProvider';

export default function TodoList({ data, filter, onClick }) {
  const darkMode = useContext(DarkModeContext);

  return (
    <main
      className={`${styles.todoList} ${darkMode.isDarkMode ? styles.dark : ''}`}
    >
      <ul onClick={onClick}>
        {data.map(({ id, content, isChecked }) => {
          if (filter === 'active' && isChecked) return;
          if (filter === 'completed' && !isChecked) return;

          return (
            <li key={id} data-id={id}>
              <input type='checkbox' checked={isChecked ? true : false}></input>
              <span className={isChecked ? styles.checked : ''}>{content}</span>
              <button>
                <MdDeleteForever
                  color={`${darkMode.isDarkMode ? 'white' : ''}`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
