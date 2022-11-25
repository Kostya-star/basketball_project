import classnames from 'classnames';
import { ErrorMessage, Field, useField } from 'formik';
import s from './FormItems.module.scss';

interface InputDateProps<T>{
  label: string
  name: T
}

export const InputDate = <T extends string>({ label, ...props }: InputDateProps<T>) => {

  const [field, meta] = useField(props);

  return (
    <div className={s.form__group}>
      <label className={s.form__label} htmlFor={props.name}>
        {label}
      </label>
      <div className={s.inputBlock}>
        <Field className={classnames(s.form__input, {
          // [s.form__submitBtn__disabled]: isDisabled || toggleLoading,
          [s.showDate]: field.value,
          [s.hideDate]: !field.value
        })} type='date' id="date-input" {...field} />
      </div>
      <ErrorMessage className={s.form__error} name={props.name} component="span"/>
    </div>
  );
};
