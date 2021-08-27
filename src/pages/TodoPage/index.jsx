import React, { useContext } from 'react';
import TasksForm from '../../components/TasksForm';
import TasksList from '../../components/TasksList';
import { connect } from 'react-redux';
import { ThemeContext } from '../../contexts';
import styles from './TodoPage.module.scss';
import ACTION_TYPES from '../../actions/actionTypes';

function TodoPage (props) {
  console.log('props :>> ', props);
  const {
    theme: { theme },
    tasks: { tasks },
  } = props;

  return (
    <div className={theme ? styles.containerLight : styles.containerDark}>
      <h1 className={theme ? styles.headerLight : styles.headerDark}>
        ToDos... ({tasks.length})
      </h1>
      <TasksForm {...props} />
      <TasksList {...props} />
    </div>
  );
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps)(TodoPage);
