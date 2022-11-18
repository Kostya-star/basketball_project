import { FC } from 'react';
import { Outlet} from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';
import s from './layout.module.scss';



export const MainLayout: FC = () => {
  
  return (
    <div>
      <Header/>
      <div className={s.layout__container}>
        <Menu/>
        <div className={s.layout__children__container}>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};



// interface ContextType {
//   setHeading: (heading: string) => void;
// }
// export function useHeading() {
//   return useOutletContext<ContextType>()
// }