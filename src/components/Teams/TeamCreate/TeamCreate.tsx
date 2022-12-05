import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useState } from 'react';
import { createTeam } from '../../../redux/slices/teamsSlice';
import { InputFile } from '../../FormComponents/InputFile';
import { useNavigate } from 'react-router-dom';
import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { INewTeamValues } from '../../../types/teams/teams';
import { RespStatusEnum } from '../../../types/enum';
import { RespError } from '../../RespError';

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

const initialValues = {
  name: '',
  division: '',
  conference: '',
  foundationYear: '',
  imageUrl: '',
} as unknown as INewTeamValues;

export const TeamCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const onCancelButton = () => {
    navigate(`/Teams`);
  };

  const onSubmit = async (values: INewTeamValues) => {
    setDisabledSubmit(true);
    const resp = await dispatch(createTeam(values, teamImage)).catch((error) => {
      if (error && error.response.status === RespStatusEnum.EXISTS) {
        setServerResponse('User with the specified login already exists');
      }
    });
    if (resp?.data) {
      onCancelButton();
    }
    setDisabledSubmit(false);
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
                    <button onClick={onCancelButton}>Cancel</button>
                    <InputSubmit isDisabled={disabledSubmit} value="Save" />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      {serverResponse && <RespError response={serverResponse} setResponse={setServerResponse} />}
    </div>
  );
};
