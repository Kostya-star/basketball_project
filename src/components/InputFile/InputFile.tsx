import { ChangeEvent } from 'react';
import s from './InputFile.module.scss'
import { ErrorMessage } from 'formik';
import { baseRequestUrl } from '../../api/baseRequest';


interface InputFileProps<T> {
  name: T;
  image: string;
  onSavePhoto: (image: File | null) => void;
}

export const InputFile = <T extends string>({ name, image, onSavePhoto }: InputFileProps<T>) => {
  // const imgPreview = image ? URL.createObjectURL(image) : '';

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onSavePhoto(e.target.files?.[0]);
    }
  };

  return (
    <div className={s.setImage}>
      <label htmlFor={name}>
        <input id={name} name={name} type="file" onChange={onChange} />
        <p>
          <img src={image ? `${baseRequestUrl}${image}` : ''} />
        </p>
      </label>
      <ErrorMessage className={s.error} name={name} component="span" />
    </div>
  );
};
