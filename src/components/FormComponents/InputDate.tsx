import classnames from 'classnames';
import s from './FormItems.module.scss';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
  withFormik,
} from 'formik';
import { ChangeEvent } from 'react';

interface InputDateProps<T> {
  label: string;
  name: T;
  value: string;
  onChange: (date: string, name: string) => void;
  onBlur: (e: any) => void;
}

export const InputDate = <T extends string>({ label, name, value, onChange, onBlur }: InputDateProps<T>) => {
  return (
    <div className={s.form__group}>
      <label className={s.form__label} htmlFor="date-input">
        {label}
      </label>
      <div className={s.inputBlock}>
        <Field
          className={classnames(s.form__input, {
            // [s.form__submitBtn__disabled]: isDisabled,
            // [s.showDate]: field.value,
            // [s.hideDate]: !field.value
          })}
          type="date"
          id="date-input"
          value={value}
          onBlur={() => onBlur(name)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, name)}
        />
      </div>
      <ErrorMessage className={s.form__error} name={name} component="span" />
    </div>
  );
};
