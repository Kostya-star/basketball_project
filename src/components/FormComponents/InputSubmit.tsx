import classnames from 'classnames';
import { FC } from 'react';
import s from './FormItems.module.scss';

interface InputSubmitProps {
  value: string;
  isDisabled?: boolean;
}

export const InputSubmit: FC<InputSubmitProps> = ({ isDisabled, value }) => {
  return (
    <>
      <input
        disabled={isDisabled}
        className={classnames(s.form__submitBtn, {
          [s.form__submitBtn__disabled]: isDisabled,
          [s.form__submitBtn_hover]: !isDisabled,
        })}
        value={value}
        type="submit"
      />
    </>
  );
};
