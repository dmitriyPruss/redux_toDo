import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import Input from '../../components/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Button } from 'react-bootstrap';
import { INPUT_SCHEMA } from './../../utils/validatingSchemas';
import { createContext } from 'react';
import styles from './TodoPage.module.scss';

const tasksDB = [
  {
    id: Date.now(),
    body: 'First task',
    isDone: false,
  },
];

function TodoPage () {
  const [theme, setTheme] = useState(true);
  const [tasks, setTasks] = useState(tasksDB);
  const [counter, setCounter] = useState(tasksDB.length);

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
  };

  const deleteTask = ({ id }) => {
    const deletedElem = tasks.findIndex(task => task.id === id);
    setTasks(tasks.splice(deletedElem, 1));
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

  const themeName = useContext(createContext(theme));

  return (
    <div
      className={
        themeName === true ? styles.containerLight : styles.containerDark
      }
    >
      <h1
        className={themeName === true ? styles.headerLight : styles.headerDark}
      >
        ToDos... ({counter})
      </h1>
      <Button
        onClick={changeTheme}
        className={styles.themeButton}
        variant={themeName === true ? 'outline-info' : 'outline-danger'}
      >
        Change Theme
      </Button>
      <Formik
        initialValues={{ body: '' }}
        validationSchema={INPUT_SCHEMA}
        onSubmit={addTask}
      >
        {formikProps => {
          // console.log('formikProps :>> ', formikProps);

          return (
            <Form className={styles.inputData}>
              <Input name='body' themeName={themeName} />
            </Form>
          );
        }}
      </Formik>
      <ul className={styles.itemsContainer}>
        {tasks.map(task => (
          <>
            <li
              key={task.id}
              className={
                themeName === true ? styles.listItemLight : styles.listItemDark
              }
            >
              <Formik initialValues={{ checkedTodo: false }}>
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
                  variant={
                    themeName === true ? 'outline-success' : 'outline-light'
                  }
                  className={styles.todoButton}
                  onClick={e => deleteTask(task)}
                >
                  <DeleteOutlineIcon />
                </Button>
              </div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
