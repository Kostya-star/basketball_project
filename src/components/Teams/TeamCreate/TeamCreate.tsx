import s from './TeamCreate.module.scss';
import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector} from '../../../redux/hooks';
import { ChangeEvent, useState, useEffect, FC } from 'react';
import { createTeam } from '../../../redux/slices/teamsSlice';
import { InputFile } from '../../FormComponents/InputFile';
import { useLocation, useNavigate } from 'react-router-dom';
import { INewTeamValues } from '../../../types/types';


export const TeamCreate = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const location = useLocation()
  
  const[teamImage, setTeamImage] = useState<File | null>(null)


  const onSaveTeamPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && location.pathname === '/TeamCreate') {
      setTeamImage(e.target.files[0])
    }
  };
  
  const onCancelHandle = () => {
    return navigate('/Teams')
  }

  const initialValues = {
    name: '',
    foundationYear: '',
    division: '',
    conference: '',
    imageUrl: '',
  } as INewTeamValues

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z$\s*]+$/, 'Field can only contain Latin letters'),
    division: Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z\s*]+$/, 'Field can only contain Latin letters'),
    conference: Yup.string()
      .required('Required')
      .matches(/^[a-zA-Z\s*]+$/, 'Field can only contain Latin letters'),
    foundationYear: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Field can only contain numbers'),
    imageUrl: Yup.mixed().required('Required')
  });
  
  const onSubmit = async (values: INewTeamValues) => {
    const resp = await dispatch(createTeam(values, teamImage))
    if(resp?.data) return navigate('/Teams')
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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form>
              <div className={s.team__create__content}>
                <div className={s.team__create__image}>
                  <InputFile<'imageUrl'> name='imageUrl' image={teamImage} formik={formik} onSavePhoto={onSaveTeamPhoto}/>
                </div>

                <div>
                  <InputText<'name'> label="Name" name="name" />
                  <InputText<'division'> label="Division" name="division" />
                  <InputText<'conference'> label="Conference" name="conference" />
                  <InputText<'foundationYear'> label="Year of foundation" name="foundationYear" />
                  <div className={s.team__create__buttons}>
                    <button onClick={onCancelHandle}>Cancel</button>
                    <InputSubmit isDisabled={!formik.isValid}  value="Save"/>
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
