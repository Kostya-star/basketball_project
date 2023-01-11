import { ErrorMessage, Field } from 'formik';
import { ChangeEvent } from 'react';
import s from './InputDate.module.scss';

interface InputDateProps<T> {
  label: string;
  name: T;
  value: string;
  onChange: (date: string, name: string) => void;
  onBlur: (e: any) => void;
}

export const InputDate = <T extends string>({
  label,
  name,
  value,
  onChange,
  onBlur,
}: InputDateProps<T>) => {
  return (
    <div className={s.date__container}>
      <label htmlFor="date-input">{label}</label>
      <div className={s.inputBlock}>
        <Field
          type="date"
          id="date-input"
          value={value}
          onBlur={() => onBlur(name)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, name)}
        />
      </div>
      <ErrorMessage className={s.date__error} name={name} component="span" />
    </div>
  );
};
