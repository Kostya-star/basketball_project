import { AxiosResponse } from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IGetPlayerResponse } from '../types/players/getPlayerResponse';
import { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// CUSTOM USE STATE HOOK
export const useStateData = (func: Function, id?: string) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<any>();

  useEffect(() => {
    void dispatch(func(id && Number(id))).then((resp: { data: SetStateAction<any> }) => {
      if (resp) {
        setData(resp?.data);
      }
    });
  }, []);

  return data;
};
