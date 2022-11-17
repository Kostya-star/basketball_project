import {FC, InputHTMLAttributes} from 'react'
import { ErrorMessage, useField } from 'formik';
import s from './FormItems.module.scss';
import { GenericType } from '../../types/types';

// type test = 'login' | 'userName' | 'name' | 'division' | 'conference' | 'foundationYear'
interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  // name: GenericType<'login' | 'userName' | 'name' | 'division' | 'conference' | 'foundationYear'>;
  name: string;
  // name: T 
}
type CustomInputProps<name = string> = Omit<InputTextProps, 'name'>  & { name: name }

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
