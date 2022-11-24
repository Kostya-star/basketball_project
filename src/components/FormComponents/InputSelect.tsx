import { ErrorMessage, Field } from 'formik';
import { FC, useState } from 'react';
import s from './FormItems.module.scss';
import {ReactComponent as SelectTickSVG} from '../../assets/icons/select__options.svg'
import {ReactComponent as SelectTubeSVG} from '../../assets/icons/select__tubeSVG.svg'
import Select, {OnChangeValue} from 'react-select';


interface InputSelectProps {
  label: string;
  name: string;
}

// interface IOptions {
//   value: string
//   label: string
// }

export const InputSelect: FC<InputSelectProps> = ({ label, name, ...rest }) => {
const[selectedOption, setSelectedOption] = useState() 
console.log(selectedOption);


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

  // const classNames = {
  //   control: (baseStyles: any, state: any) => ({
  //     ...baseStyles,
  //     borderColor: state.isFocused ? 'grey' : 'red',
  //     ...baseStyles,
  //     color: 'red'
  //   })
  // }

  return (
    <div className={s.select}>
      <span>Positions</span>
      <Select
        options={options}
        value={getValue()}
        onChange={onChangeOption}
        // styles={classNames}
        name={name}
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
