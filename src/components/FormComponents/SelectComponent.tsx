import { ErrorMessage} from 'formik';
import { useState } from 'react';
import s from './FormItems.module.scss';
import Select from 'react-select';



export interface ISelectOption {
  value: string;
  label: string;
}

interface ISelectComponentProps<T> {
  label: string;
  name: T;
  onChange: (option: string, name: string) => void
  onBlur: (name: string) => void
  options: ISelectOption[]
  getPositions?: () => void
}

export const SelectComponent = <T extends string>({ label, name, options, getPositions, onChange, onBlur }: ISelectComponentProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const classNames = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      color: '#707070',
      backgroundColor: '#F6F6F6',
      fontSize: '14px',
      fontWeight: '500',
      border: 0,
      marginBottom: '5px',
      boxShadow: 'none',
      transition: '0.2s',
      '&:hover': {
        backgroundColor: '#D1D1D1',
        border: 'none',
      },
      '&:focus': {
        background: '#F6F6F6',
        boxShadow: '0px 0px 5px #D9D9D9',
        border: 'none',
      },
      cursor: 'pointer',
    }),
    option: (baseStyles: any, state: any) => ({
      ...baseStyles,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#C60E2E' : 'white',
      fontWeight: '500',
      color: state.isSelected ? 'white' : '#9C9C9C',
      transition: '0.2s',
      '&:hover': {
        backgroundColor: '#FF768E',
        color: 'white',
      },
    }),
    dropdownIndicator: (baseStyles: any) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    loadingIndicator: (baseStyles: any) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    clearIndicator: (baseStyles: any) => ({
      ...baseStyles,
      color: 'inherit',
    }),
  };

  const setOnChange = (option: ISelectOption | null) => {
    if (option) {
      setSelectedOption(option.value);
      onChange(option.value, name);
    }
  };

  return (
    <div onClick={getPositions} className={s.select}>
      <span className={s.select__label}>{label}</span>
      <Select
        options={options}
        styles={classNames}
        name={name}
        isLoading={!selectedOption}
        onChange={setOnChange}
        onBlur={() => onBlur(name)}
      />

      <ErrorMessage className={s.form__error} name={name} component="span" />
    </div>
  );
};
