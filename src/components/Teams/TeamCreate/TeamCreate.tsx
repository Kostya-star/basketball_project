import { InputText } from '../../FormComponents/InputText';
import { Form, Formik, FormikProps } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ChangeEvent, useState, useEffect, FC } from 'react';
import { createTeam } from '../../../redux/slices/teamsSlice';
import { InputFile } from '../../FormComponents/InputFile';
import { useLocation, useNavigate } from 'react-router-dom';
import { INewTeamValues } from '../../../types/types';
import { InfoHeader } from '../../InfoHeader/InfoHeader';

export const TeamCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [teamImage, setTeamImage] = useState<File | null>(null);

  const onCancelHandle = () => {
    return navigate('/Teams');
  };

  const initialValues = {} as INewTeamValues;

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
    imageUrl: Yup.mixed().required('Required'),
  });

  const onSubmit = async (values: INewTeamValues) => {
    const resp = await dispatch(createTeam(values, teamImage));
    if (resp?.data) return navigate('/Teams');
  };

  return (
    <div className="common__create">
      <InfoHeader text="Teams / Add new team" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          const onSaveTeamPhoto = (image: File | null) => {
            formik.setFieldValue('imageUrl', image);
            setTeamImage(image);
          };

          return (
            <Form>
              <div className="common__create__content">
                <div className="common__create__image">
                  <InputFile<'imageUrl'>
                    name="imageUrl"
                    image={teamImage}
                    onSavePhoto={onSaveTeamPhoto}
                  />
                </div>

                <div>
                  <InputText<'name'> label="Name" name="name" />
                  <InputText<'division'> label="Division" name="division" />
                  <InputText<'conference'> label="Conference" name="conference" />
                  <InputText<'foundationYear'> label="Year of foundation" name="foundationYear" />
                  <div className="common__create__buttons">
                    <button onClick={onCancelHandle}>Cancel</button>
                    <InputSubmit isDisabled={!formik.isValid} value="Save" />
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
