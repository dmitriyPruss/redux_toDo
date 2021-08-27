import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import Input from '../../components/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ThemeContext } from './../../contexts';
import { Button } from 'react-bootstrap';
import { addTask, deleteTask, checkTask } from './../../actions';
import { connect } from 'react-redux';
import styles from './../../pages/TodoPage/TodoPage.module.scss';

function TasksList (props) {
  const {
    theme: { theme },
    tasks: { tasks },
    deleteTaskAction,
    checkTaskAction,
  } = props;

  console.log('props :>> ', props);

  const checkTaskHandler = data => {
    checkTaskAction(data);
  };

  const deleteTaskHandler = data => {
    deleteTaskAction(data);
  };

  return (
    <ul className={styles.itemsContainer}>
      {tasks.map(task => (
        <li
          key={task.id}
          className={theme ? styles.listItemLight : styles.listItemDark}
        >
          <Formik initialValues={{ checkedTodo: task.isDone }}>
            {formikProps => {
              return (
                <Form>
                  <Field
                    type='checkbox'
                    name='checkedTodo'
                    onClick={e => checkTaskHandler(task)}
                  />
                </Form>
              );
            }}
          </Formik>
          <span>{task.body}</span>
          <div>
            <Button
              variant={theme ? 'outline-success' : 'outline-light'}
              onClick={e => deleteTaskHandler(task)}
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
  return {
    addTaskAction: data => {
      dispatch(addTask(data));
    },
    deleteTaskAction: data => {
      dispatch(deleteTask(data));
    },
    checkTaskAction: data => {
      dispatch(checkTask(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
