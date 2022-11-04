import React from 'react';
import { ErrorMessage, useField } from 'formik';
import s from './FormItems.module.scss';
import classnames from 'classnames';
import { GenericType } from '../../types/types';

interface InputCheckboxProps {
  label: string;
  name: string;
  id: GenericType<'check'>
}

export const InputCheckbox: React.FC<InputCheckboxProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className={s.form__group}>
      <label
        className={classnames(s.checkbox__label, {
          [s.checkbox__label_error]: meta.error && meta.touched,
        })}
        htmlFor={props.name}
      >
        <input
          type='checkbox'
          className={classnames(s.checkbox__input, {
            [s.checkbox__input_checked]: field.checked,
          })}
          {...field}
          {...props}
        />
        {label}
      </label>
      <ErrorMessage className={s.form__error} name={props.name} component="span"/>
    </div>
  );
};
