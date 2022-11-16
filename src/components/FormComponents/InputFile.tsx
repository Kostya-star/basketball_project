import { ChangeEvent, FC } from 'react';
import s from './FormItems.module.scss';
import { GenericType } from '../../types/types';
import { ErrorMessage, Field, useField } from 'formik';

interface InputFileProps {
  name: GenericType<'file'>;
  image: File | null;
  formik: any;
  onSavePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile: FC<InputFileProps> = ({ onSavePhoto, formik, ...props }) => {
  console.log(formik);

  return (
    <>
      <label htmlFor="file">
        <input
          id="file"
          name='file'
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onSavePhoto(e);
            formik.setFieldValue('file', e.target.files?.[0]);
          }}
          onBlur={formik.handleBlur}
        />
        <div className={s.setImage}>
          <img src={props.image ? URL.createObjectURL(props.image) : ''} />
        </div>
      </label>
      {formik.touched.file && formik.errors.file ? (
         <div className={s.form__error}>{formik.errors.file}</div>
       ) : null}
    </>
  );
};
