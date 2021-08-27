import ACTION_TYPES from './actionTypes';

export const addTask = data => ({ type: ACTION_TYPES.ADD_TASK, data: data });

export const deleteTask = data => ({
  type: ACTION_TYPES.DELETE_TASK,
  data: data,
});

export const checkTask = changedInfo => ({
  type: ACTION_TYPES.CHECK_TASK,
  changedInfo: changedInfo,
});
