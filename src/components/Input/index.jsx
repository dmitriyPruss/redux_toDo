import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import styles from './../../pages/TodoPage/TodoPage.module.scss';

const Input = props => {
  const { name, theme, ...rest } = props;

  return (
    <>
      <Field name={name}>
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
        variant={theme ? 'outline-success' : 'outline-light'}
        as='input'
        type='submit'
        value='Add Task'
      />
    </>
  );
};

export default Input;
