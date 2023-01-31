import './AppTodo.css';
import { TodoHeader, TodoList, TodoInput } from './components';
import DarkModeProvider from './context/DarkModeProvider';

function App() {
  return (
    <DarkModeProvider>
      <TodoHeader />
      <TodoList />
      <TodoInput />
    </DarkModeProvider>
  );
}

export default App;
