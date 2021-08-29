import React from 'react';
import TasksForm from '../../components/TasksForm';
import TasksList from '../../components/TasksList';
import { connect } from 'react-redux';
import styles from './TodoPage.module.scss';

function TodoPage (props) {
  const {
    theme: { theme },
    tasks: { tasks },
  } = props;

  return (
    <div className={theme ? styles.containerLight : styles.containerDark}>
      <h1 className={theme ? styles.headerLight : styles.headerDark}>
        ToDos... ({tasks.length})
      </h1>
      <TasksForm />
      <TasksList />
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(TodoPage);
