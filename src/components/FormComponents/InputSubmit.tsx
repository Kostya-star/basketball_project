import {FC} from 'react'
import classnames from 'classnames';
// import { useField } from 'formik';
import s from './FormItems.module.scss'


interface InputSubmitProps {
  value: string
  isDisabled?: boolean
}
export const InputSubmit: FC<InputSubmitProps> = ({isDisabled, value}) => {
  // const [field, meta] = useField({ ...props})

  return (
    <>
      <input disabled={isDisabled} className={classnames(s.form__submitBtn,{
        [s.form__submitBtn__disabled]: isDisabled,
        [s.form__submitBtn_hover]: !isDisabled,
      })} value={value}  type="submit"/>
    </>
  );
};
