import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import Input from '../../components/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ThemeContext } from './../../contexts';
import { Button } from 'react-bootstrap';
import { INPUT_SCHEMA } from './../../utils/validatingSchemas';

import { connect } from 'react-redux';
import styles from './TodoPage.module.scss';

function TodoPage (props) {
  // const { changeTheme } = props;
  // const [tasks, setTasks] = useState([]);

  const { changeTheme, tasks, addTask, deleteTask, checkTask } = props;
  // console.log('props :>> ', props);
  const [counter, setCounter] = useState(tasks.length);
  const getCounter = () => {
    setCounter(tasks.length);
  };

  // const addTask = (values, formikBag) => {
  //   let stopFunc = null;
  //   tasks.forEach(task => {
  //     if (task.body === values.body.trim()) {
  //       stopFunc = true;
  //     }
  //   });
  //   if (stopFunc) {
  //     return;
  //   }

  //   const newTask = {
  //     id: Date.now(),
  //     body: values.body,
  //     isDone: false,
  //   };
  //   setTasks([...tasks, newTask]);

  //   formikBag.resetForm();
  // };

  useEffect(() => {
    getCounter();
  }, [tasks.length]);

  const theme = useContext(ThemeContext);

  return (
    <div className={theme ? styles.containerLight : styles.containerDark}>
      <h1 className={theme ? styles.headerLight : styles.headerDark}>
        ToDos... ({counter})
      </h1>
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
        onSubmit={addTask}
      >
        {formikProps => {
          return (
            <Form className={styles.inputData}>
              <Input name='body' theme={theme} placeholder='Enter Todo...' />
            </Form>
          );
        }}
      </Formik>
      <ul className={styles.itemsContainer}>
        {tasks.map(task => (
          <li
            key={task.id}
            className={theme ? styles.listItemLight : styles.listItemDark}
          >
            <Formik initialValues={{ checkedTodo: task.isDone }}>
              {formikProps => {
                console.log('formikProps.values :>> ', formikProps.values);
                return (
                  <Form>
                    <Field
                      type='checkbox'
                      name='checkedTodo'
                      onClick={e => checkTask(task)}
                    />
                  </Form>
                );
              }}
            </Formik>
            <span>{task.body}</span>
            <div>
              <Button
                variant={theme ? 'outline-success' : 'outline-light'}
                onClick={e => deleteTask(task)}
              >
                <DeleteOutlineIcon />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => state.tasks;
const mapDispatchToProps = dispatch => {
  return {
    addTask: data => dispatch({ type: 'ADD_TASK', data }),
    deleteTask: data => dispatch({ type: 'DELETE_TASK', data }),
    checkTask: data => dispatch({ type: 'CHECK_TASK', data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
