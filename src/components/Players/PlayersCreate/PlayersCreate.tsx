import { Field, Form, Formik, FormikProps } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { InputFile } from "../../FormComponents/InputFile";
import { SelectComponent } from "../../FormComponents/SelectComponent";
import { InputSubmit } from "../../FormComponents/InputSubmit";
import { InputText } from "../../FormComponents/InputText";
import { InfoHeader } from "../../InfoHeader/InfoHeader";
import { InputDate } from "../../FormComponents/InputDate";
import * as Yup from 'yup';
import { IPlayerState } from "../../../types/types";



export const PlayersCreate = () => {
  const[playersImage, setPlayersImage] = useState<File | null>(null)

  // const onSavePlayerPhoto = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.length) {
  //     setPlayersImage(e.target.files[0])
  //   }
  // };

  const initialValues = {
    name: '',
    position: '',
    team: '',
    height: '',
    weight: '',
    birthday: '',
    number: '',
    avatarUrl: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z$\s*]+$/, 'Field can only contain Latin letters'),
    position: Yup.string()
      .required('Required'),
      // .matches(/^[a-zA-Z\s*]+$/, 'Field can only contain Latin letters'),
    team: Yup.string()
      .required('Required'),
      // .matches(/^[a-zA-Z\s*]+$/, 'Field can only contain Latin letters'),
    height: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Field can only contain numbers'),
    weight: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Field can only contain numbers'),
    birthday: Yup.string()
      .required('Required'),
      // .matches(/^[0-9]+$/, 'Field can only contain numbers'),
    number: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Field can only contain numbers'),
    avatarUrl: Yup.mixed().required('Required')
  });


  const onSubmit = () => {
    alert('values')
  }


  return (
    <div className='common__create'>
      <InfoHeader text='Players / Add new player' />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          const onSavePlayerPhoto = (image: File | null) => {
            formik.setFieldValue('avatarUrl', image)
            setPlayersImage(image)
          }
          
          return (
            <Form>
              <div className='common__create__content'>
                <div className='common__create__image'>
                  <InputFile<'avatarUrl'> name='avatarUrl' image={playersImage} onSavePhoto={onSavePlayerPhoto}/>
                </div>

                <div>
                  <InputText<'name'> label="Name" name="name" />
                  <SelectComponent label='Positions' name='position' formik={formik}/>
                  <SelectComponent label='Teams' name='team' formik={formik}/>
                  <div className='common__create__groupParameters' >             
                    <InputText<'height'> label="Height (cm)" name="height" />
                    <InputText<'weight'> label="Weight (kg)" name="weight" />
                  </div>
                  <div className='common__create__groupParameters' >
                    <InputDate<'birthday'> label="Birthday" name="birthday" />
                    <InputText<'number'> label="Number" name="number" />
                  </div>
                  <div className='common__create__buttons'>
                    <button>Cancel</button>
                    <InputSubmit isDisabled={!formik.isValid} value="Save"/>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
