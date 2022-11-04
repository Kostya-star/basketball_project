import { useState, FC } from 'react';
import { useField, Field, ErrorMessage } from 'formik';
import s from './FormItems.module.scss';
// import {Icon, closedEye, openedEye} from './Icon';
import { ReactComponent as EyeClosed } from '../../assets/icons/eye-closed.svg';
import { ReactComponent as EyeOpened } from '../../assets/icons/eye-open.svg';
import { GenericType } from '../../types/types';

interface InputPasswordProps {
  label: string;
  name: GenericType<'password' | 'confirmPassword'>;
}

export const InputPassword: FC<InputPasswordProps> = ({ label, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [field, meta] = useField(props);

  const onTogglePasswordSVG = () => {
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
        <div onClick={onTogglePasswordSVG}>
          {isPasswordVisible ? (
            <EyeOpened className={s.password__eye__opened} />
          ) : (
            <EyeClosed className={s.password__eye__closed} />
          )}
        </div>
      </div>
      <ErrorMessage className={s.form__error} name={props.name} component="span"/>
    </div>
  );
};
