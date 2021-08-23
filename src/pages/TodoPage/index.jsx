import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Button } from 'react-bootstrap';
import { INPUT_SCHEMA } from './../../utils/validatingSchemas';
import styles from './TodoPage.module.scss';

function TodoPage () {
  const [theme, setTheme] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(tasks.length);

  const getCounter = () => {
    setCounter(tasks.length);
  };

  const changeTheme = () => {
    setTheme(!theme);
  };

  const addTask = (values, formikBag) => {
    let stopFunc = null;
    tasks.forEach(task => {
      if (task.body === values.body.trim()) {
        stopFunc = true;
      }
    });
    if (stopFunc) {
      return;
    }

    const newTask = {
      id: Date.now(),
      body: values.body,
      isDone: false,
    };
    setTasks([...tasks, newTask]);

    formikBag.resetForm();
  };

  const deleteTask = ({ id }) => {
    const deletedElem = tasks.findIndex(task => task.id === id);
    const newTasks = [...tasks];
    newTasks.splice(deletedElem, 1);
    setTasks(newTasks);
  };

  const checkTask = ({ id }) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }
      return task;
    });

    setTasks(newTasks);
  };

  useEffect(() => {
    getCounter();
  }, [tasks.length]);

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
              <Form>
                <Field
                  type='checkbox'
                  name='checkedTodo'
                  onClick={e => checkTask(task)}
                />
              </Form>
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

export default TodoPage;
