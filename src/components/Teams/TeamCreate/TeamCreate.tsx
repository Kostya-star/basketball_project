import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';
import { addPhoto, createTeam, editTeam, getTeam } from '../../../redux/slices/teamsSlice';
import { InputFile } from '../../FormComponents/InputFile';
import { useNavigate } from 'react-router-dom';
import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { INewTeamValues, ITeamData } from '../../../types/teams/teams';
import { RespStatusEnum } from '../../../types/enum';
import { RespError } from '../../RespError';
import qs from 'qs';
import { baseRequestUrl } from './../../../api/baseRequest';

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

export const TeamCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [teamImage, setTeamImage] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const [teamData, setTeamData] = useState({} as ITeamData);

  const { id } = qs.parse(location.search.substring(1));

  useEffect(() => {
    if (id) {
      void dispatch(getTeam(Number(id))).then((resp) => {
        setTeamData(resp.data);
      });
    }
  }, []);

  const onSubmit = async (values: INewTeamValues) => {
    setDisabledSubmit(true);

    // const { id } = qs.parse(location.search.substring(1));
    if (id) {
      const newTeamValues = {
        ...values,
        id: Number(id),
      };
      void dispatch(editTeam(newTeamValues)).then(() => {
        onRedirectTeamDetails();
      });
      setDisabledSubmit(false);
      return;
    }

    const resp = await dispatch(createTeam(values)).catch((error) => {
      if (error && error.response.status === RespStatusEnum.EXISTS) {
        setServerResponse('User with the specified login already exists');
      }
    });
    if (resp) {
      onRedirectTeams();
    }

    setDisabledSubmit(false);
  };

  const onRedirectTeams = () => {
    navigate(`/Teams`);
  };

  const onRedirectTeamDetails = () => {
    navigate(`/TeamDetails?id=${Number(id)}`);
  };

  const initialValues = {
    name: teamData?.name ?? '',
    division: teamData?.division ?? '',
    conference: teamData?.conference ?? '',
    foundationYear: teamData?.foundationYear ?? '',
    imageUrl: teamData?.imageUrl ?? '',
  } as unknown as INewTeamValues;

  return (
    <div className="common__create">
      <InfoHeader text="Teams / Add new team" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
      >
        {(formik) => {
          const onSaveTeamPhoto = (image: File | null) => {
            void dispatch(addPhoto(image)).then((imgString) => {
              if (imgString) {
                formik.setFieldValue('imageUrl', imgString);
                setTeamImage(imgString);
              }
            });
          };

          return (
            <Form>
              <div className="common__create__content">
                <div className="common__create__image">
                  <InputFile<'imageUrl'>
                    name="imageUrl"
                    image={teamImage || teamData.imageUrl}
                    onSavePhoto={onSaveTeamPhoto}
                  />
                </div>

                <div>
                  <InputText<'name'> label="Name" name="name" />
                  <InputText<'division'> label="Division" name="division" />
                  <InputText<'conference'> label="Conference" name="conference" />
                  <InputText<'foundationYear'> label="Year of foundation" name="foundationYear" />
                  <div className="common__create__buttons">
                    <button
                      onClick={() => {
                        if (id) {
                          onRedirectTeamDetails();
                          return;
                        }
                        onRedirectTeams();
                      }}
                    >
                      Cancel
                    </button>
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
