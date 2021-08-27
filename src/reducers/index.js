import { combineReducers } from 'redux';
import tasksReducer from './tasksReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  theme: themeReducer,
});

export default rootReducer;
