import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import Input from '../../components/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Button } from 'react-bootstrap';
import { INPUT_SCHEMA } from './../../utils/validatingSchemas';

import styles from './TodoPage.module.scss';

const tasksDB = [
  {
    id: Date.now(),
    body: 'First task',
    isDone: false,
  },
];

function TodoPage () {
  const [tasks, setTasks] = useState(tasksDB);

  const [counter, setCounter] = useState(tasksDB.length);

  const getCounter = () => {
    setCounter(counter + tasksDB.length);
  };

  const addTask = (values, formikBag) => {
    const newTask = {
      id: Date.now(),
      body: values.body,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = ({ id }) => {
    setTasks(tasks.filter(task => task.id !== id));
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

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ToDos... ({counter})</h1>
      <Formik
        initialValues={{ body: '' }}
        validationSchema={INPUT_SCHEMA}
        onSubmit={addTask}
      >
        {formikProps => {
          console.log('formikProps :>> ', formikProps);

          return (
            <Form className={styles.inputData}>
              <Input name='body' onClick={getCounter} />

              {/* <Field className={styles.inputElement} name='body' />
              <ErrorMessage
                component='div'
                name='body'
                className={styles.errorValue}
              />
              <Button
                variant='outline-secondary'
                as='input'
                type='submit'
                onClick={getCounter}
                value='Add Task'
              /> */}
            </Form>
          );
        }}
      </Formik>
      <ul className={styles.itemsContainer}>
        {tasks.map(task => (
          <>
            <li key={task.id} className={styles.listItem}>
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
                  variant='outline-dark'
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
