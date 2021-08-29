import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Button } from 'react-bootstrap';
import { deleteTask, checkTask } from './../../actions';
import { connect } from 'react-redux';
import styles from './../../pages/TodoPage/TodoPage.module.scss';

function TasksList (props) {
  const {
    theme: { theme },
    tasks: { tasks },
    deleteTaskAction,
    checkTaskAction,
  } = props;

  const mapTask = ({ id, body, isDone }, index) => {
    const checkTaskHandler = () => {
      checkTaskAction({ id: id, isDone: !isDone });
    };

    const deleteTaskHandler = () => {
      deleteTaskAction(id);
    };

    return (
      <li
        key={id}
        className={theme ? styles.listItemLight : styles.listItemDark}
      >
        <input type='checkbox' onClick={checkTaskHandler} />
        <span>{body}</span>
        <Button
          variant={theme ? 'outline-success' : 'outline-light'}
          onClick={deleteTaskHandler}
        >
          <DeleteOutlineIcon />
        </Button>
      </li>
    );
  };

  return <ul className={styles.itemsContainer}>{tasks.map(mapTask)}</ul>;
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
