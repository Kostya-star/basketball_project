import classnames from 'classnames';
import { useField } from 'formik';
import s from './InputCheckbox.module.scss';


interface InputCheckboxProps<T> {
  label: string;
  name: string;
  id: T;
}

export const InputCheckbox = <T extends string>({label, ...props }: InputCheckboxProps<T>) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div className={s.checkbox}>
      <label
        className={classnames(s.checkbox__label, {
          [s.checkbox__label_error]: meta.error && meta.touched,
        })}
        htmlFor={props.name}
      >
        <input
          type="checkbox"
          className={classnames(s.checkbox__input, {
            [s.checkbox__input_checked]: field.checked,
          })}
          {...field}
          {...props}
        />
        {label}
      </label>
    </div>
  );
};
