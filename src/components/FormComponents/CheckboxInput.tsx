import React from 'react';
import { useField } from 'formik';
import s from './FormItems.module.scss';

interface CheckboxInputPropsType {
  children: string;
  type: string;
  name: string;
  id?: string;
  onChange?: () => void;
  onBlur?: () => void;
}

export const CheckboxInput: React.FC<CheckboxInputPropsType> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <p>
        <input {...field} {...props} />
        <label className={s.form__agreement} htmlFor="">
          {children}
        </label>
        {meta.touched && meta.error && <div className={s.form__error}>{meta.error}</div>}
      </p>
    </>
  );
};
