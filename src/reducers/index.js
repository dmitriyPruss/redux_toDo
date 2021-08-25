const initialState = {
  tasks: [],
  // counter: 0,
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    // case 'GET_COUNTER':
    //   return { ...state, counter: state.counter + state.tasks.length };
    case 'ADD_TASK':
      const { taskData } = action;
      const { tasks } = state;

      const newTask = {
        id: Date.now(),
        body: userData,
        isDone: false,
      };

      const newTasks = [...tasks, newTask];
      return { tasks: newTasks };

    case 'DELETE_TASK':
      const { tasks } = state;
      const { id } = action;

      const newTasks = [...tasks];
      const deletedElem = newTasks.findIndex(newTask => newTask.id === id);
      newTasks.splice(deletedElem, 1);

      return { tasks: newTasks };
    case 'CHECK_TASK':
      const { tasks } = state;
      const { changedInfo } = action;
      const newTasks = tasks.map(task => {
        if (task.id === changedInfo.id) {
          task.isDone = changedInfo.isDone;
        }

        return task;
      });

      return { tasks: newTasks };
    default:
      return state;
  }
};

export default reducer;
