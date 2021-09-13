import { Formik, Form } from 'formik';
import React from 'react';
import Input from '../../components/Input';
import { INPUT_SCHEMA } from './../../utils/validatingSchemas';
import { addTask } from './../../actions';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

function TasksForm (props) {
  const {
    theme,
    addTaskAction,
    formClasses: { inputData },
  } = props;

  const addTaskHandler = (values, formikBag) => {
    addTaskAction(values);

    formikBag.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ body: '' }}
        validationSchema={INPUT_SCHEMA}
        onSubmit={addTaskHandler}
      >
        {formikProps => {
          return (
            <Form className={inputData}>
              <Input name='body' placeholder='Enter Todo...' />
              <Button
                variant={theme ? 'outline-success' : 'outline-light'}
                as='input'
                type='submit'
                value='Add Task'
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

const mapStateToProps = state => state.theme;
const mapDispatchToProps = dispatch => {
  return {
    addTaskAction: data => {
      dispatch(addTask(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksForm);
