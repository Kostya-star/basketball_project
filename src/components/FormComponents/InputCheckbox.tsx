import React from 'react';
import { useField } from 'formik';
import s from './FormItems.module.scss';
import classNames from 'classnames';

interface InputCheckboxPropsType {
  label: string;
  type: string;
  name: string;
  id?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

export const InputCheckbox: React.FC<InputCheckboxPropsType> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  console.log(meta.error);


  return (
    <div className={s.form__group}>
      <label className={s.checkbox__label} htmlFor={props.name || props.id}>
        <input
          className={s.checkbox__input}
          {...field}
          {...props}
        />
        <span> {label}</span>
      </label>
      {(meta.touched && meta.error) && <div className={s.form__error}>{meta.error}</div>}
    </div>
  );
};
