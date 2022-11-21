import { ChangeEvent, FC } from 'react';
import s from './FormItems.module.scss';
import { ErrorMessage, Field, FormikProps, useField } from 'formik';
import { INewTeamValues } from './../../types/types';

interface InputFileProps<T> {
  name: T;
  image: File | null;
  formik: FormikProps<INewTeamValues>;
  onSavePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile = <T extends string>({ name, image, onSavePhoto, formik }: InputFileProps<T>) => {

  const imgPreview = image ? URL.createObjectURL(image) : ''

  const onSavePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onSavePhoto(e);
    formik.setFieldValue('imageUrl', e.target.files?.[0]);
  }

  const fieldError = formik.touched.imageUrl && formik.errors.imageUrl

  return (
    <>
      <label htmlFor="imageUrl">
        <input
          id='imageUrl'
          name='imageUrl'
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSavePhotoHandler(e)}
          onBlur={formik.handleBlur}
        />
        <div className={s.setImage}>
          <img src={imgPreview} />
        </div>
      </label>
      {fieldError ? (
         <div className={s.form__error}>{formik.errors.imageUrl}</div>
       ) : null}
    </>
  );
};
