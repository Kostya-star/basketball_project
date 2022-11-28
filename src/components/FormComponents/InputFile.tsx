import { ChangeEvent, FC, FocusEvent, useState } from 'react';
import s from './FormItems.module.scss';
import { ErrorMessage, Field, FormikProps, useField } from 'formik';
import { INewTeamValues, IPlayerState } from './../../types/types';


interface InputFileProps<T> {
  name: T;
  image: File | null;
  onSavePhoto: (image: File | null) => void;
}

export const InputFile = <T extends string>({ name, image, onSavePhoto }: InputFileProps<T>) => {
  const imgPreview = image ? URL.createObjectURL(image) : '';

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files?.[0] && onSavePhoto(e.target.files?.[0]);

  return (
    <div className={s.setImage}>
      <label htmlFor={name}>
        <input id={name} name={name} type="file" onChange={onChange} />
        <div>
          <img src={imgPreview} />
        </div>
      </label>
      <ErrorMessage className={s.form__error} name={name} component="span" />
    </div>
  );
};
