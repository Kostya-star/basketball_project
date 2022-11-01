import React from 'react';
import { useField, Field } from 'formik';
import s from './FormItems.module.scss';
import classnames  from 'classnames';
import { SvgGenerator } from './SvgGenerator';

interface InputTextPropsType {
  label: string;
  name: string;
  id?: string;
  type: string;
  onChange?: () => void;
  onBlur?: () => void;
  setPasswordType: (isVisible: boolean) => void
}

export const InputText: React.FC<InputTextPropsType> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log(props);
  
  return (
    <div className={s.form__group}>
      <label className={s.form__label} htmlFor={props.name || props.id}>
        {label}
      </label>
      <div className={s.inputBlock}>
        <input className={s.form__input} type={props.type} {...field}  />
        {(props.name === 'password' || props.name === 'confirmPassword') && (
          <SvgGenerator id='closed-eye' onClick={(isVisible: boolean) => props.setPasswordType(!isVisible)}/>
        )}
      </div>
      {meta.touched && meta.error && <span className={s.form__error}>{meta.error}</span>}
    </div>
  );
};
