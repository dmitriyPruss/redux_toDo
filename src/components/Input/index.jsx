import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';

import classNames from 'classnames';
import styles from './../../pages/TodoPage/TodoPage.module.scss';

const Input = props => {
  const { name, getCounter, ...rest } = props;

  return (
    <>
      <Field name={name} placeholder='First Name'>
        {({ field, form, meta }) => {
          const inputClassName = classNames(styles.inputElement, {
            [styles.valid]: !meta.error && meta.touched,
            [styles.invalid]: meta.error && meta.touched,
          });
          return <input {...field} {...rest} className={inputClassName} />;
        }}
      </Field>

      <ErrorMessage name={name} component='p' className={styles.errorValue} />
      <Button
        variant='outline-secondary'
        as='input'
        type='submit'
        onClick={getCounter}
        value='Add Task'
      />
    </>
  );
};

export default Input;
