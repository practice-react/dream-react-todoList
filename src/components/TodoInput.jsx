import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeProvider';
import styles from '../styles/TodoInput.module.css';

export default function TodoInput({ onSubmit }) {
  const darkMode = useContext(DarkModeContext);

  const handleChange = (e) => {
    console.log(e.target);
  };
  return (
    <form
      className={`${styles.todoInput} ${
        darkMode.isDarkMode ? styles.dark : ''
      }`}
      onSubmit={onSubmit}
      onChange={handleChange}
    >
      <input
        type='text'
        name='text'
        className={styles.input}
        placeholder='Add Todo'
      />
      <button type='submit' className={styles.add}>
        Add
      </button>
    </form>
  );
}
