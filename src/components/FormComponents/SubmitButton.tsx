import classnames from 'classnames';
import { useField } from 'formik';
import React from 'react';
import s from './FormItems.module.scss'


interface SubmitButtonPropsType {
  value: string
  name: string
  disabled: boolean
}
export const SubmitButton: React.FC<SubmitButtonPropsType> = ({disabled, value}) => {
  
  return (
    <>
      <input disabled={disabled} className={classnames(s.form__submitBtn,{
        [s.form__submitBtn__disabled]: disabled,
      })} value={value}  type="submit"/>
    </>
  );
};
