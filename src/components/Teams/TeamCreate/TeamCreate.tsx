import s from './TeamCreate.module.scss';
import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ChangeEvent, useState, useEffect } from 'react';
import { setTeamImage } from '../../../redux/slices/teamsSlice';
import { InputFile } from '../../FormComponents/InputFile'

interface INewTeamValues {
  team_name: string;
  team_division: string;
  team_conference: string;
  team_year: string;
  file: File;
}

const validationSchema = Yup.object({
  team_name: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z]+$/, 'Field can only contain Latin letters'),
  team_division: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z]+$/, 'Field can only contain Latin letters'),
  team_conference: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z]+$/, 'Field can only contain Latin letters'),
  team_year: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers'),
});

export const TeamCreate = () => {
  const dispatch = useAppDispatch();
  const { teamImg } = useAppSelector(({ teams }) => ({
    teamImg: teams.teamImg,
  }));

  const onSaveTeamPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      void dispatch(setTeamImage(e.target.files[0]));
    }
  };

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
            team_name: '',
            team_division: '',
            team_conference: '',
            team_year: '',
            file: teamImg,
          } as INewTeamValues
        }
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          console.log(values);
        }}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form>
              <div className={s.team__create__content}>
                <div className={s.team__create__image}>
                  <InputFile image={teamImg} onSavePhoto={onSaveTeamPhoto}/>
                </div>

                <div>
                  <InputText label="Name" name="team_name" />
                  <InputText label="Division" name="team_division" />
                  <InputText label="Conference" name="team_conference" />
                  <InputText label="Year of foundation" name="team_foundationYear" />
                  <div className={s.team__create__buttons}>
                    <button>Cancel</button>
                    <InputSubmit isDisabled={!formik.isValid} value="Save" name="button" />
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
