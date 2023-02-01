import React, { useContext } from 'react';
import styles from '../styles/TodoList.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { DarkModeContext } from '../context/DarkModeProvider';

export default function TodoList({ data, onClick }) {
  const darkMode = useContext(DarkModeContext);

  // input checkbox의 checked를 컨트롤하려하니 onChange이벤트를 사용해서 제어하라고 한다.
  // 아니 그러면 모든 이벤트 위임이 안되잖아
  // readOnly 속성을 추가하면 되지만 이게 맞나?
  return (
    <main
      className={`${styles.todoList} ${darkMode.isDarkMode ? styles.dark : ''}`}
    >
      <ul onClick={onClick}>
        {data.map(({ id, content, isChecked }) => (
          <li key={id} data-id={id}>
            <input
              type='checkbox'
              checked={isChecked ? true : false}
              readOnly
            ></input>
            <span className={isChecked ? styles.checked : ''}>{content}</span>
            <button>
              <MdDeleteForever
                color={`${darkMode.isDarkMode ? 'white' : ''}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
