import React from 'react';
import TasksForm from '../../components/TasksForm';
import TasksList from '../../components/TasksList';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ACTION_TYPES from '../../actions/actionTypes';
import styles from './TodoPage.module.scss';

function TodoPage (props) {
  const { theme, length, changeTheme } = props;

  const formClasses = {
    inputData: styles.inputData,
  };

  const listClasses = {
    itemsContainer: styles.itemsContainer,
    listItemLight: styles.listItemLight,
    listItemDark: styles.listItemDark,
  };

  return (
    <div className={theme ? styles.containerLight : styles.containerDark}>
      <h1 className={theme ? styles.headerLight : styles.headerDark}>
        ToDos... ({length})
      </h1>
      <Button
        className={styles.themeButton}
        variant={theme ? 'outline-info' : 'outline-danger'}
        onClick={changeTheme}
      >
        Change Theme
      </Button>
      <TasksForm formClasses={formClasses} />
      <TasksList listClasses={listClasses} />
    </div>
  );
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
  length: state.tasks.tasks.length,
});

const mapDispatchToProps = dispatch => {
  return {
    changeTheme: () => dispatch({ type: ACTION_TYPES.CHANGE_THEME }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
