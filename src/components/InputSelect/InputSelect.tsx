import classnames from 'classnames';
import { ErrorMessage } from 'formik';
import Select, { MenuPlacement, PropsValue, StylesConfig } from 'react-select';
import { ISelectOption } from 'types/ISelectOption';
import s from './InputSelect.module.scss'

interface InputSelectProps<T> {
  label?: string;
  name: T;
  isMulti: boolean;
  value?: PropsValue<ISelectOption> | PropsValue<ISelectOption[]>;
  defaultValue?: PropsValue<ISelectOption>;
  menuPlacement?: MenuPlacement;
  options: ISelectOption[];
  border?: boolean;
  onChange?: (option: string, name: string) => void;
  onChangeMulti?: (option: ISelectOption[]) => void;
  onBlur?: (name: string) => void;
  getPositions?: () => void;
}

export const InputSelect = <T extends string>({
  label,
  name,
  options,
  isMulti,
  value,
  defaultValue,
  menuPlacement,
  border,
  onChangeMulti,
  onChange,
  onBlur,
}: InputSelectProps<T>) => {
  // const [selectedOption, setSelectedOption] = useState<string | ISelectOption[] | null>(null);

  const IsMulti = isMulti;

  const classNames: StylesConfig<ISelectOption | ISelectOption[], typeof IsMulti> = {
    control: (baseStyles) => ({
      ...baseStyles,
      color: '#707070',
      padding: '3px 0px',
      backgroundColor: IsMulti || name === 'pagination_select' ? 'white' : '#F6F6F6',
      border: border ? '0.5px solid #D1D1D1' : 'none',
      fontSize: '14px',
      fontWeight: '500',
      // border: 0,
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
      if (IsMulti && onChangeMulti) {
        onChangeMulti?.(option);
      } else if (onChange) {
        onChange?.(option.value, name);
      }
    }
  };

  return (
    <div
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

      {/* {name !== 'multi_select' && name !== 'pagination_select' && (
        <ErrorMessage className={s.select__error} name={name} component="span" />
      )} */}
    </div>
  );
};
