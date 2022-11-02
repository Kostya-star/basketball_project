import React from 'react';
import { useField } from 'formik';
import s from './FormItems.module.scss';


interface InputTextProps {
  label: string;
  name: string;
  id?: string;
  type: string;
  onChange?: () => void;
  onBlur?: () => void;
}

export const InputText: React.FC<InputTextProps> = ({ label, ...props }) => {

  const [field, meta] = useField(props);

  return (
    <div className={s.form__group}>
      <label className={s.form__label} htmlFor={props.name || props.id}>
        {label}
      </label>
      <div className={s.inputBlock}>
        <input className={s.form__input} type={props.type} {...field} />
      </div>
      {meta.touched && meta.error && <span className={s.form__error}>{meta.error}</span>}
    </div>
  );
};
