import s from './TeamCreate.module.scss';
import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ChangeEvent, useState, useEffect } from 'react';
import { createTeam, setTeamImage } from '../../../redux/slices/teamsSlice';
import { InputFile } from '../../FormComponents/InputFile';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { INewTeamValues } from '../../../types/types';


const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z]+$/, 'Field can only contain Latin letters'),
  division: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z]+$/, 'Field can only contain Latin letters'),
  conference: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z]+$/, 'Field can only contain Latin letters'),
  foundationYear: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers'),
  imageUrl: Yup.mixed().required('Required')
});

export const TeamCreate = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  const { teamImg, imageUrl } = useAppSelector(({ teams }) => ({
    teamImg: teams.teamImg,
    imageUrl: teams.imageUrl,
  }));

  const onSaveTeamPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      void dispatch(setTeamImage(e.target.files[0]));
    }
  };

  const onCancelHandle = () => {
    navigate('/TeamsEmpty')
  }

//   function inputVal<T = string>(string: T): T {
//     return string;
// }
// inputVal('userName')


  return (
    <div className={s.team__create}>
      <div className={s.team__create__header}>
        <p>
          <span>Teams</span>
          &nbsp; / &nbsp;
          <span>Add new team</span>
        </p>
      </div>

      <Formik
        initialValues={
          {
            name: '',
            foundationYear: '',
            division: '',
            conference: '',
            imageUrl: '',
          } as INewTeamValues
        }
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          values.imageUrl = imageUrl
          console.log(values);
          await dispatch(createTeam(values))
        }}
        // validateOnMount
      >
        {(formik) => {
          return (
            <Form>
              <div className={s.team__create__content}>
                <div className={s.team__create__image}>
                  <InputFile name='imageUrl' image={teamImg} formik={formik} onSavePhoto={onSaveTeamPhoto}/>
                </div>

                <div>
                  <InputText label="Name" name="name" />
                  <InputText label="Division" name="division" />
                  <InputText label="Conference" name="conference" />
                  <InputText label="Year of foundation" name="foundationYear" />
                  <div className={s.team__create__buttons}>
                    <button onClick={onCancelHandle}>Cancel</button>
                    <InputSubmit isDisabled={!formik.isValid}  value="Save" name="button" />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
