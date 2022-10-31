import React from 'react';
import s from './FormItems.module.scss'

export const SubmitButton = () => {
  return (
    <>
      <button className={s.form__submitBtn} type="submit">
        Sign In
      </button>
    </>
  );
};
