import {FC} from 'react'
import classnames from 'classnames';
// import { useField } from 'formik';
import s from './FormItems.module.scss'
import { useAppSelector } from '../../redux/hooks';


interface InputSubmitProps {
  value: string
  isDisabled?: boolean
}
export const InputSubmit: FC<InputSubmitProps> = ({isDisabled, value}) => {
  
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
      <input disabled={isDisabled} className={classnames(s.form__submitBtn,{
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        [s.form__submitBtn__disabled]: isDisabled,
        [s.form__submitBtn_hover]: !isDisabled,
      })} value={value}  type="submit"/>
    </>
  );
};
