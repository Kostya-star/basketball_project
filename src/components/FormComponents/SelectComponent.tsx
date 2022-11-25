import { ErrorMessage, Field} from 'formik';
import { FC, useState } from 'react';
import s from './FormItems.module.scss';
import Select  from 'react-select';



// export const SelectFC = () => {
//   return <Field name=/>
// }


interface ISelectComponentProps {
  label: string
  name: string
  formik: any
}

export const SelectComponent: FC<ISelectComponentProps> = ({ label, name, formik}) => {
  
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

  const onChangeOption = (option: any) => {
    setSelectedOption(option)
    if(name === 'position') {
      formik.setFieldValue('position', option.value)
    } else if(name === 'team') {
      formik.setFieldValue('team', option.value)
    }
  }

  const onBlurOption = () => {
    if(name === 'position') {
      formik.setFieldTouched('position', true)
    } else if(name === 'team') {
      formik.setFieldTouched('team', true)
    }
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
      transition: '0.2s',
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
        styles={classNames}
        name={name}
        isClearable={true}
        isLoading={!selectedOption}
        onChange={onChangeOption}
        onBlur={onBlurOption}
        />

<ErrorMessage className={s.form__error} name={name} component="span" />
    {/* { 
      (!!formik.errors.position && formik.touched.position) && (<div>{formik.errors.position}</div>)
    } */}
    </div>
  );
};
