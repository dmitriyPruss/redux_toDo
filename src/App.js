import './App.css';
import React, { Component, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import TodoPage from './pages/TodoPage';

const App = () => <TodoPage />;

export default App;
