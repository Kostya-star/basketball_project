import {FC} from 'react'
import { useField } from 'formik';
import s from './FormItems.module.scss';
import { GenericType } from '../../types/types';


interface InputTextProps {
  label: string;
  name: GenericType<'login' | 'userName'>;
  id?: string;
  type: GenericType<'text'>;
  onChange?: () => void;
  onBlur?: () => void;
}

export const InputText: FC<InputTextProps> = ({ label, ...props }) => {

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
