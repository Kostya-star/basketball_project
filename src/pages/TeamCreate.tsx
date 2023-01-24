import { CancelBtn } from 'components/CancelBtn/CancelBtn';
import { InfoHeader } from 'components/InfoHeader/InfoHeader';
import { InputFile } from 'components/InputFile/InputFile';
import { InputSubmit } from 'components/InputSubmit/InputSubmit';
import { InputText } from 'components/InputText/InputText';
import { ServerResponse } from 'components/ServerResponse/ServerResponse';
import { ErrorMessage, Form, Formik } from 'formik';
import { useStateData } from 'hooks';
import qs from 'qs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { addPhoto, createTeam, editTeam, getTeam } from 'redux/slices/teamsSlice';
import { RespStatusEnum } from 'types/enum';
import { INewTeamValues, ITeamData } from 'types/teams/teams';
import * as Yup from 'yup';

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
    .matches(/^[0-9]+$/, 'Field can only contain numbers')
    .matches(/^[1-9][0-9]*$/, 'Year must not start with 0'),
  imageUrl: Yup.mixed().required('Required'),
});

export const TeamCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [teamImage, setTeamImage] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const { id } = qs.parse(location.search.substring(1)) as { id: string };

  const teamData: ITeamData = useStateData(getTeam, id);

  const onSubmit = async (values: INewTeamValues) => {
    setDisabledSubmit(true);
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
        setServerResponse('Team with the specified name already exists');
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

  const onNavigateBack = () => {
    if (id) {
      return onRedirectTeamDetails();
    }
    onRedirectTeams();
  };

  const getBackLink = 'Teams';

  return (
    <div className="common__container">
      <div className="common__create">
        <InfoHeader getBackLink={getBackLink} name="Add new team" />

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
              <div className="common__create__content">
                <Form>
                  <div className="common__create__image">
                    <InputFile<'imageUrl'>
                      name="imageUrl"
                      image={teamImage || teamData?.imageUrl}
                      onSavePhoto={onSaveTeamPhoto}
                    />
                    <ErrorMessage className="form__error" name="imageUrl" component="span" />
                  </div>

                  <div className="form">
                    <div className="form__group">
                      <InputText<'name'> label="Name" name="name" />
                      <ErrorMessage className="form__error" name="name" component="span" />
                    </div>

                    <div className="form__group">
                      <InputText<'division'> label="Division" name="division" />
                      <ErrorMessage className="form__error" name="division" component="span" />
                    </div>

                    <div className="form__group">
                      <InputText<'conference'> label="Conference" name="conference" />
                      <ErrorMessage className="form__error" name="conference" component="span" />
                    </div>

                    <div className="form__group">
                      <InputText<'foundationYear'>
                        label="Year of foundation"
                        name="foundationYear"
                      />
                      <ErrorMessage
                        className="form__error"
                        name="foundationYear"
                        component="span"
                      />
                    </div>

                    <div className="common__create__buttons">
                      <CancelBtn onClick={onNavigateBack} />
                      <InputSubmit isDisabled={disabledSubmit} value="Save" width={true} />
                    </div>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
        {serverResponse && (
          <ServerResponse response={serverResponse} setResponse={setServerResponse} />
        )}
      </div>
    </div>
  );
};
