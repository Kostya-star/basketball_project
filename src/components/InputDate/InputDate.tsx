import { ErrorMessage } from 'formik';
import { ChangeEvent } from 'react';
import s from './InputDate.module.scss';

interface InputDateProps<T> {
  label: string;
  name: T;
  value: string;
  onChange: (date: string, name: string) => void;
  onBlur: (name: string) => void;
}

export const InputDate = <T extends string>({
  label,
  name,
  value,
  onChange,
  onBlur,
}: InputDateProps<T>) => {
  return (
    <div className={s.date}>
      <label htmlFor="date-input">{label}</label>
      <input
        type="date"
        id="date-input"
        value={value}
        onBlur={() => onBlur(name)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, name)}
      />
    </div>
  );
};
