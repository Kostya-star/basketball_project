import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "./redux/hooks";

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
