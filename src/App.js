import './App.css';
import React, { useState } from 'react';
import TodoPage from './pages/TodoPage';
import { ThemeContext } from './contexts';

const App = () => {
  const [themeName, setTheme] = useState(true);

  const changeTheme = () => {
    setTheme(!themeName);
  };

  return (
    <ThemeContext.Provider value={themeName}>
      <TodoPage changeTheme={changeTheme} />
    </ThemeContext.Provider>
  );
};

export default App;
