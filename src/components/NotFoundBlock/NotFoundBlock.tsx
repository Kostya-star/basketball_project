import notFound from 'assets/img/NotFound/notFound.png';
import s from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={s.notFound__wrapper}>
      <div>
        <p className={s.notFound__img}>
          <img src={notFound} alt="404 img" />
        </p>
        <h1 className={s.notFound__heading}>Page not found</h1>
        <p className={s.notFound__text}>Sorry, we can’t find what you’re looking for</p>
      </div>
    </div>
  );
};
