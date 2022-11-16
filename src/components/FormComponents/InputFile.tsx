import { ChangeEvent, FC } from 'react';
import s from './FormItems.module.scss'
import { useAppDispatch } from './../../redux/hooks';


interface InputFileProps {
  image: File | null
  onSavePhoto: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputFile: FC<InputFileProps> = ({ image, onSavePhoto }) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <label htmlFor="file">
        <input id="file" name="file" type="file" onChange={onSavePhoto} />
        <div className={s.setImage}>
          <img src={image ? URL.createObjectURL(image) : ''} alt="" />
        </div>
      </label>
    </>
  );
};
