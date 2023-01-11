import classnames from 'classnames';
import { FC } from 'react';
import s from './InputSubmit.module.scss';

interface InputSubmitProps {
  value: string;
  isDisabled?: boolean;
}

export const InputSubmit: FC<InputSubmitProps> = ({ isDisabled, value }) => {
  return (
    <>
      <input
        disabled={isDisabled}
        className={classnames(s.submitBtn, {
          [s.submitBtn_disabled]: isDisabled,
          [s.submitBtn_hover]: !isDisabled,
        })}
        value={value}
        type="submit"
      />
    </>
  );
};
