import { ChangeEvent, FC } from 'react';
import s from './FormItems.module.scss';
import { ErrorMessage, Field, FormikProps, useField } from 'formik';
import { INewTeamValues, IPlayerState } from './../../types/types';

type CreateTeamPlayerValues = INewTeamValues | IPlayerState

interface InputFileProps<T> {
  name: T;
  image: File | null;
  // formik: FormikProps<CreateTeamPlayerValues>;
  formik: any;
  onSavePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile = <T extends string>({ name, image, onSavePhoto, formik }: InputFileProps<T>) => {
console.log(name);

  const imgPreview = image ? URL.createObjectURL(image) : ''

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onSavePhoto(e);
    if(name === 'avatarUrl') {
      formik.setFieldValue('avatarUrl', e.target.files?.[0]);
    } else if(name === 'imageUrl') {
      formik.setFieldValue('imageUrl', e.target.files?.[0]);
    }
  }

  const onBlurHandler = () => {
    if(name === 'avatarUrl') {
      formik.setFieldTouched('avatarUrl', true);
    } else if(name === 'imageUrl') {
      formik.setFieldTouched('imageUrl', true);
    }
  }

  return (
    <>
      <label htmlFor={name}>
        <input
          id={name}
          name={name}
          type="file"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        <div className={s.setImage}>
          <img src={imgPreview} />
        </div>
      </label>
       <ErrorMessage className={s.form__error} name={name} component="span"/>
       {
        // (formik.errors.avatarUrl && formik.touched.avatarUrl) && (<div>{formik.errors.position}</div>)
      }
        
    </>
  );
};
