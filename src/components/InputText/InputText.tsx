import { useField } from 'formik';
import s from './InputText.module.scss';

interface InputTextProps<T> {
  label: string;
  name: T;
}

export const InputText = <T extends string>({ label, ...props }: InputTextProps<T>) => {
  const [field, _] = useField(props);

  return (
    <div className={s.text}>
      <label htmlFor={props.name}>{label}</label>
      <input type="text" {...field} />
    </div>
  );
};
