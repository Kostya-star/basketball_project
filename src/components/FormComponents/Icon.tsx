import React, { Component } from 'react';
import s from './FormItems.module.scss';
import { ReactComponent as EyeClosed } from '../../assets/icons/eye-closed.svg';
import { ReactComponent as EyeOpened } from '../../assets/icons/eye-open.svg';

interface IconProps {
  id: string;
  setPasswordType?: () => void;
}

const closedEye = 'closed-eye'
const openedEye = 'opened-eye'

export const Icon = ({ id, setPasswordType }: IconProps) => {
  switch (id) {
    case closedEye:
      return <EyeClosed className={s.password__eye__closed} onClick={() => setPasswordType?.()} />;

    case openedEye:
      return <EyeOpened className={s.password__eye__opened} onClick={() => setPasswordType?.()} />;
    default:
      return <svg></svg>;
  }
};
