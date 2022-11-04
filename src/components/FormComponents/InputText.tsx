import {FC} from 'react'
import { ErrorMessage, useField } from 'formik';
import s from './FormItems.module.scss';
import { GenericType } from '../../types/types';


interface InputTextProps {
  label: string;
  name: GenericType<'login' | 'userName'>;
}

export const InputText: FC<InputTextProps> = ({ label, ...props }) => {

  const [field, meta] = useField(props);

  return (
    <div className={s.form__group}>
      <label className={s.form__label} htmlFor={props.name}>
        {label}
      </label>
      <div className={s.inputBlock}>
        <input className={s.form__input} type='text' {...field} />
      </div>
      <ErrorMessage className={s.form__error} name={props.name} component="span"/>
    </div>
  );
};
