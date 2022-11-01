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
  const [isChecked, setIsChecked] = React.useState(false);
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  console.log(meta.error);
  console.log(isChecked);


  return (
    <div className={s.form__group}>
      <label className={s.checkbox__label} htmlFor={props.name || props.id}>
        <input
          className={classNames(s.checkbox__input, {
            [s.checkbox__input_checked]: isChecked
          }) }
          {...field}
          onChange={() => setIsChecked((isChecked) => !isChecked)}
          {...props}
          checked={isChecked}
        />
        <span> {label}</span>
      </label>
      {(meta.touched && meta.error) && <div className={s.form__error}>{meta.error}</div>}
    </div>
  );
};
