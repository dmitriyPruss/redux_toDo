import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import Input from '../../components/Input';
import { ThemeContext } from './../../contexts';
import { Button } from 'react-bootstrap';
import { INPUT_SCHEMA } from './../../utils/validatingSchemas';
import ACTION_TYPES from '../../actions/actionTypes';
import { addTask, deleteTask, checkTask } from './../../actions';
import { connect } from 'react-redux';
import styles from './../../pages/TodoPage/TodoPage.module.scss';

function TasksForm (props) {
  const {
    theme: { theme },
    tasks: { tasks },
    changeTheme,
    addTaskAction,
  } = props;

  const addTaskHandler = (values, formikBag) => {
    addTaskAction(values);

    formikBag.resetForm();
  };

  return (
    <>
      <Button
        className={styles.themeButton}
        variant={theme ? 'outline-info' : 'outline-danger'}
        onClick={changeTheme}
      >
        Change Theme
      </Button>
      <Formik
        initialValues={{ body: '' }}
        validationSchema={INPUT_SCHEMA}
        onSubmit={addTaskHandler}
      >
        {formikProps => {
          return (
            <Form className={styles.inputData}>
              <Input name='body' theme={theme} placeholder='Enter Todo...' />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

const mapStateToProps = state => state.tasks;
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
    changeTheme: () => dispatch({ type: ACTION_TYPES.CHANGE_THEME }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksForm);
