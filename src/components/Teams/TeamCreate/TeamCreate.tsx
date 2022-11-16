import s from './TeamCreate.module.scss';
import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ChangeEvent, useState, useEffect } from 'react';
import { setTeamImage } from '../../../redux/slices/teamsSlice';
import { InputFile } from '../../FormComponents/InputFile';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface INewTeamValues {
  name: string;
  division: string;
  conference: string;
  foundationYear: string;
  imageUrl: File | null;
}

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
  
  const { teamImg } = useAppSelector(({ teams }) => ({
    teamImg: teams.teamImg,
  }));

  const onSaveTeamPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      void dispatch(setTeamImage(e.target.files[0]));
    }
  };

  const onCancelHandle = () => {
    navigate('/TeamsEmpty')
  }

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
            imageUrl: teamImg !== null ? teamImg : '',
          } as INewTeamValues
        }
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
          const resp = await axios.post('http://dev.trainee.dex-it.ru/api/Team/Add', values,  {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`,
              // 'Content-Type': 'multipart/form-data'
            }
          })
          console.log(resp);
          
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
