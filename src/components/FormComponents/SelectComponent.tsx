import { ErrorMessage} from 'formik';
import { FC, useState } from 'react';
import s from './FormItems.module.scss';
import Select  from 'react-select';


interface ISelectComponentProps<T> {
  label: string;
  name: T;
}

export const SelectComponent = <T extends string>({ label, name, ...rest }: ISelectComponentProps<T>) => {

  const[selectedOption, setSelectedOption] = useState() 

  const options = [
    {value: 'center_forward', label: 'Center Forward'},
    {value: 'guard_forward', label: 'Guard Forward'},
    {value: 'forward', label: 'Forward'},
    {value: 'center', label: 'Center'},
    {value: 'guard', label: 'Guard'}
  ]

  const getValue = () => {
    return selectedOption ? options.find(option => option === selectedOption) : ''
  }

  const onChangeOption = (newVal: any) => {
    setSelectedOption(newVal)
  }

  const classNames = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      color: '#707070',
      backgroundColor: '#F6F6F6',
      fontSize: '14px',
      fontWeight: '500',
      border: 0,
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#D1D1D1',
        border: 'none'
      },  
      '&:focus': {
        background: '#F6F6F6',
        boxShadow: '0px 0px 5px #D9D9D9',
        border: 'none'
      },
      cursor: 'pointer'
    }),
    option: (baseStyles: any, state: any) => ({
      ...baseStyles,
      cursor: 'pointer',
      backgroundColor: state.isSelected ? '#C60E2E' : 'white',
      fontWeight: '500',
      color: state.isSelected ? 'white' : '#9C9C9C',
      "&:hover": {
        backgroundColor: '#FF768E',
        color: 'white',
      }
    }),
    dropdownIndicator: (baseStyles: any) => ({
      ...baseStyles,
      color: "inherit"
    }),
    loadingIndicator: (baseStyles: any) => ({
      ...baseStyles,
      color: "inherit"
    }),
    clearIndicator: (baseStyles: any) => ({
      ...baseStyles,
      color: "inherit"
    })
  }

  return (
    <div className={s.select}>
      <span className={s.select__label}>{label}</span>
      <Select
        options={options}
        value={getValue()}
        onChange={onChangeOption}
        styles={classNames}
        name={name}
        isClearable={true}
        isLoading={!selectedOption}
        />

      <ErrorMessage className={s.form__error} name={name} component="span" />
    </div>
  );
};
// export const InputSelect: FC<InputSelectProps> = ({ label, name, options, ...rest }) => {
//   return (
//     <div className={s.select}>
//       <label htmlFor={name}>
//         {label}
//       </label>
//       <div className={s.select__group}>
//         <Field  placeholder='Select...' as="select" id={name} name={name} {...rest}>
//           {options.map((option) => {
//             return (
//               <option key={option.value} value={option.value}>
//                 {option.key}
//               </option>
//             );
//           })}
//         </Field>
//         <div className={s.select__tickSVG}><SelectTickSVG/></div>
//         <div className={s.select__tubeSVG}><SelectTubeSVG/></div>
//       </div>
//       <ErrorMessage className={s.form__error} name={name} component="span" />
//     </div>
//   );
// };
