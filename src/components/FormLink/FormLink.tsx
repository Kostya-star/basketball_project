import { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './FormLink.module.scss';

interface IFormLinkProps {
  mainText: string;
  path: string;
  linkText: string;
}

export const FormLink: FC<IFormLinkProps> = ({ mainText, path, linkText }) => {
  return (
    <div className={s.link}>
      {mainText}
      <Link to={path}> {linkText} </Link>
    </div>
  );
};
