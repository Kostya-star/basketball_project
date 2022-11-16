import { ChangeEvent, FC } from 'react';
import s from './FormItems.module.scss';
import { GenericType } from '../../types/types';
import { ErrorMessage, Field, useField } from 'formik';

interface InputFileProps {
  name: GenericType<'imageUrl'>;
  image: File | null;
  formik: any;
  onSavePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile: FC<InputFileProps> = ({ name, image, onSavePhoto, formik }) => {
console.log(formik.values);

  return (
    <>
      <label htmlFor="file">
        <input
          id='file'
          name='imageUrl'
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onSavePhoto(e);
            formik.setFieldValue('imageUrl', e.target.files?.[0]);
          }}
          onBlur={formik.handleBlur}
        />
        <div className={s.setImage}>
          <img src={image ? URL.createObjectURL(image) : ''} />
        </div>
      </label>
      {formik.touched.imageUrl && formik.errors.imageUrl ? (
         <div className={s.form__error}>{formik.errors.imageUrl}</div>
       ) : null}
    </>
  );
};
