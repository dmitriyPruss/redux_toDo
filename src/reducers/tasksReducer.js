import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPES.ADD_TASK: {
      const { data } = action;
      const { tasks } = state;

      let stopFunc = null;
      tasks.forEach(task => {
        if (task.body === data.body.trim()) {
          stopFunc = true;
        }
      });
      if (stopFunc) {
        return;
      }

      const newTask = {
        id: Date.now(),
        isDone: false,
        ...data,
      };

      const newTasks = [...tasks, newTask];

      console.log(`tasks`, tasks);

      return { tasks: newTasks };
    }

    case ACTION_TYPES.DELETE_TASK: {
      const { tasks } = state;
      const {
        data: { id },
      } = action;

      const newTasks = [...tasks];
      const deletedElem = newTasks.findIndex(newTask => newTask.id === id);
      newTasks.splice(deletedElem, 1);

      return { tasks: newTasks };
    }
    case ACTION_TYPES.CHECK_TASK: {
      const { tasks } = state;
      console.log(`action.changedInfo`, action.changedInfo);

      const {
        changedInfo: { id, isDone },
      } = action;

      const newTasks = tasks.map(task => {
        if (task.id === id) {
          task.isDone = !isDone;
        }

        return task;
      });

      return { tasks: newTasks };
    }
    default:
      return state;
  }
};

export default tasksReducer;
