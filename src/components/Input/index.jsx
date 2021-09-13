import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import styles from './Input.module.scss';

const Input = props => {
  const { name, ...rest } = props;

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
    </>
  );
};

export default Input;
