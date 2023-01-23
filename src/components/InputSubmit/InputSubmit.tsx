import classnames from 'classnames';
import { FC } from 'react';
import s from './InputSubmit.module.scss';

interface InputSubmitProps {
  value: string;
  isDisabled?: boolean;
  width?: boolean;
}

export const InputSubmit: FC<InputSubmitProps> = ({ value, isDisabled, width }) => {
  return (
    <>
      <input
        disabled={isDisabled}
        value={value}
        className={classnames(s.submitBtn, {
          [s.submitBtn_disabled]: isDisabled,
          [s.submitBtn_hover]: !isDisabled,
          [s.submitBtn_sized]: width,
        })}
        type="submit"
      />
    </>
  );
};
