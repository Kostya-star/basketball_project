import { ReactComponent as EyeClosed } from 'assets/icons/eye-closed.svg';
import { ReactComponent as EyeOpened } from 'assets/icons/eye-open.svg';
import { ErrorMessage, useField } from 'formik';
import { useState } from 'react';
import s from './FormItems.module.scss';

interface InputPasswordProps<T> {
  label: string;
  name: T;
}

export const InputPassword = <T extends string>({ label, ...props }: InputPasswordProps<T>) => {
  const [field, meta] = useField(props);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onHandlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={s.form__group}>
      <label className={s.form__label} htmlFor={props.name}>
        {label}
      </label>
      <div className={s.inputBlock}>
        <input
          className={s.form__input}
          type={!isPasswordVisible ? 'password' : 'text'}
          {...field}
        />
        <div onClick={onHandlePasswordVisible}>
          {isPasswordVisible ? (
            <EyeOpened className={s.password__eye__opened} />
          ) : (
            <EyeClosed className={s.password__eye__closed} />
          )}
        </div>
      </div>
      <ErrorMessage className={s.form__error} name={props.name} component="span" />
    </div>
  );
};
