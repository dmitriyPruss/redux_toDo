import ACTION_TYPES from './actionTypes';

export const addTask = data => ({ type: ACTION_TYPES.ADD_TASK, data });

export const deleteTask = id => ({
  type: ACTION_TYPES.DELETE_TASK,
  id,
});

export const checkTask = changedInfo => ({
  type: ACTION_TYPES.CHECK_TASK,
  changedInfo,
});
