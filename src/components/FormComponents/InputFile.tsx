import { ChangeEvent, FC, FocusEvent, useState } from 'react';
import s from './FormItems.module.scss';
import { ErrorMessage, Field, FormikProps, useField } from 'formik';
import { INewTeamValues, IPlayerState } from './../../types/types';

type CreateTeamPlayerValues = INewTeamValues | IPlayerState

interface InputFileProps<T> {
  name: T;
  image: File | null;
  // formik: FormikProps<CreateTeamPlayerValues>;
  // formik: any;
  onSavePhoto: (image: File | null) => void;
}

export const InputFile = <T extends string>({ name, image, onSavePhoto}: InputFileProps<T>) => {

  const imgPreview = image ? URL.createObjectURL(image) : ''

  return (
    <div className={s.setImage}>
      <label htmlFor={name}>
        <input
          id={name}
          name={name}
          type="file"
          onChange={(e) => (e.target.files?.[0]) && onSavePhoto(e.target.files?.[0])}
        />
        <div >
          <img src={imgPreview} />
        </div>
      </label>
       <ErrorMessage className={s.form__error} name={name} component="span"/>
    </div>
  );
};
