import { ErrorMessage } from 'formik';
import { useState } from 'react';
import s from './FormItems.module.scss';
import Select, { MenuPlacement, PropsValue, StylesConfig } from 'react-select';
import classnames from 'classnames';

export interface ISelectOption {
  value: string | number;
  label: string | number;
  id?: number
}

interface ISelectComponentProps<T> {
  label?: string;
  name: T;
  isMulti: boolean;
  value?: PropsValue<ISelectOption> | PropsValue<ISelectOption[]>;
  defaultValue?: PropsValue<ISelectOption>;
  menuPlacement?: MenuPlacement;
  onChange?: (option: string | ISelectOption[], name: string) => void;
  onBlur?: (name: string) => void;
  options: ISelectOption[];
  getPositions?: () => void;
}

export const SelectComponent = <T extends string>({
  label,
  name,
  options,
  isMulti,
  value,
  defaultValue,
  menuPlacement,
  getPositions,
  onChange,
  onBlur,
}: ISelectComponentProps<T>) => {
  // const [selectedOption, setSelectedOption] = useState<string | ISelectOption[] | null>(null);

  const IsMulti = isMulti;

  const classNames: StylesConfig<ISelectOption | ISelectOption[], typeof IsMulti> = {
    control: (baseStyles) => ({
      ...baseStyles,
      color: '#707070',
      backgroundColor: IsMulti || name === 'pagination_select' ? 'white' : '#F6F6F6',
      fontSize: '14px',
      fontWeight: '500',
      border: 0,
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
    option: (baseStyles, state) => ({
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
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    loadingIndicator: (baseStyles) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    clearIndicator: (baseStyles) => ({
      ...baseStyles,
      color: 'inherit',
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      flexWrap: 'nowrap',
      // textOverflow: "-",
      // display: `${state.hasValue ? 'initial' : 'flex'}`,
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: '#E4163A',
      borderRadius: '4px',
      color: 'white',
      minWidth: '25%',
      display: 'flex',
      justifyContent: 'space-between',
    }),
    multiValueLabel: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
      fontSize: '15px',
      lineHeight: '19px',
      fontFamily: 'Avenir, sans-serif',
    }),
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
    }),
  };

  // const setOnChange = (option: ISelectOption | null) => {
  const setOnChange = (option: any) => {
    if (option) {
      if (IsMulti) {
        onChange?.(option, name);
        // setSelectedOption(option);
      } else {
        // setSelectedOption(option.value);
        onChange?.(option.value, name);
      }
    }
  };

  return (
    <div
      onClick={getPositions}
      className={classnames({
        [s.select]: !IsMulti,
        [s.select__multi]: IsMulti,
      })}
    >
      <label>{label}</label>
      <Select
        options={options}
        styles={classNames}
        name={name}
        isMulti={IsMulti}
        menuPlacement={menuPlacement}
        value={value}
        defaultValue={defaultValue}
        hideSelectedOptions={false}
        closeMenuOnSelect={!IsMulti}
        isSearchable={false}
        onChange={setOnChange}
        onBlur={() => onBlur?.(name)}
      />

      {name !== 'multi_select' && name !== 'pagination_select' && (
        <ErrorMessage className={s.form__error} name={name} component="span" />
      )}
    </div>
  );
};
