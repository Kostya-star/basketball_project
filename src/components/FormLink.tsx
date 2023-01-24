import { FC } from 'react';
import { Link } from 'react-router-dom';
import 'scss/auth.scss';

interface IFormLinkProps {
  mainText: string;
  path: string;
  linkText: string;
}

export const FormLink: FC<IFormLinkProps> = ({ mainText, path, linkText }) => {
  return (
    <div className="form__link">
      {mainText}
      <Link to={path}> {linkText} </Link>
    </div>
  );
};
