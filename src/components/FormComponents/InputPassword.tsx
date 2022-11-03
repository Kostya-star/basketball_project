import React from 'react';
import { useField, Field } from 'formik';
import s from './FormItems.module.scss';
import {Icon, closedEye, openedEye} from './Icon';


interface InputPasswordtProps {
  label: string;
  name: string;
  id?: string;
  type: string;
  onChange?: () => void;
  onBlur?: () => void;
}

export const InputPassword: React.FC<InputPasswordtProps> = ({ label, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const [field, meta] = useField(props);

  const onTogglePasswordSVG = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={s.form__group}>
      <label className={s.form__label} htmlFor={props.name || props.id}>
        {label}
      </label>
      <div className={s.inputBlock}>
        <input
          className={s.form__input}
          type={!isPasswordVisible ? 'password' : 'text'}
          {...field}
        />
          <Icon 
            id={!isPasswordVisible ? closedEye : openedEye}
            setPasswordType={onTogglePasswordSVG}
          />
          {/* <Icon className={s.password__eye__closed} name='eye-closed'/> */}
      </div>
      {meta.touched && meta.error && <span className={s.form__error}>{meta.error}</span>}
    </div>
  );
};
