import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  theme: true,
};

const themeReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPES.CHANGE_THEME: {
      return { theme: !state.theme };
    }
    default:
      return state;
  }
};

export default themeReducer;
