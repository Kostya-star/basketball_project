import classnames from 'classnames';
import { useField } from 'formik';
import React from 'react';
import s from './FormItems.module.scss'


interface InputSubmitProps {
  value: string
  name: string
  isDisabled?: boolean
}
export const InputSubmit: React.FC<InputSubmitProps> = ({isDisabled, value, ...props}) => {
  const [field, meta] = useField({ ...props})

  return (
    <>
      <input disabled={isDisabled} className={classnames(s.form__submitBtn,{
        [s.form__submitBtn__disabled]: isDisabled,
        [s.form__submitBtn_hover]: !isDisabled,
      })} value={value}  type="submit"/>
    </>
  );
};
