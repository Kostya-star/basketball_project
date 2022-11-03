import React from 'react';
import { ErrorMessage, useField } from 'formik';
import s from './FormItems.module.scss';
import classnames from 'classnames';

interface InputCheckboxProps {
  label: string;
  type: string;
  name: string;
  id?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

export const InputCheckbox: React.FC<InputCheckboxProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className={s.form__group}>
      <label
        className={classnames(s.checkbox__label, {
          [s.checkbox__label_error]: meta.error && meta.touched,
        })}
        htmlFor={props.name || props.id}
      >
        <input
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
