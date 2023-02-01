import styles from '../styles/TodoHeader.module.css';
import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeProvider';
import { BsFillSunFill } from 'react-icons/bs';
import { MdOutlineNightlightRound } from 'react-icons/md';

const filterList = ['all', 'active', 'completed'];

export default function TodoHeader({ filter, onClick }) {
  const { isDarkMode, togleDarkMode } = useContext(DarkModeContext);

  return (
    <header className={`${styles.header} ${isDarkMode ? styles.dark : ''}`}>
      <button className='dark-btn' onClick={togleDarkMode}>
        {isDarkMode ? (
          <BsFillSunFill color='white' />
        ) : (
          <MdOutlineNightlightRound />
        )}
      </button>
      <ul className={styles.filter} onClick={onClick}>
        {filterList.map((_filter, i) => (
          <li
            key={i}
            data-filter={_filter}
            className={
              _filter === filter
                ? isDarkMode
                  ? styles['clicked-dark'] // 카멜케이스로 접근이 불가능하다 왜지??
                  : styles.clicked
                : ''
            }
          >
            {_filter.slice(0, 1).toUpperCase() + _filter.slice(1)}
          </li>
        ))}
      </ul>
    </header>
  );
}
