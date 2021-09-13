import React from 'react';
import { deleteTask, checkTask } from './../../actions';
import { connect } from 'react-redux';
import TasksListItem from './TasksListItem';

function TasksList (props) {
  const {
    theme: { theme },
    tasks: { tasks },
    deleteTaskAction,
    checkTaskAction,
    listClasses: { itemsContainer },
  } = props;

  const mapTask = ({ id, body, isDone }, index) => {
    const checkTaskHandler = () => {
      checkTaskAction({ id: id, isDone: !isDone });
    };

    const deleteTaskHandler = () => {
      deleteTaskAction(id);
    };

    return (
      <TasksListItem
        key={id}
        body={body}
        theme={theme}
        checkTaskHandler={checkTaskHandler}
        deleteTaskHandler={deleteTaskHandler}
        listClasses={props.listClasses}
      />
    );
  };

  return <ul className={itemsContainer}>{tasks.map(mapTask)}</ul>;
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
  return {
    deleteTaskAction: id => {
      dispatch(deleteTask(id));
    },
    checkTaskAction: changedInfo => {
      dispatch(checkTask(changedInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
