import { CancelBtn } from 'components/CancelBtn/CancelBtn';
import { InfoHeader } from 'components/InfoHeader/InfoHeader';
import { InputDate } from 'components/InputDate/InputDate';
import { InputFile } from 'components/InputFile/InputFile';
import { InputSelect } from 'components/InputSelect/InputSelect';
import { InputSubmit } from 'components/InputSubmit/InputSubmit';
import { InputText } from 'components/InputText/InputText';
import { RespError } from 'components/RespError';
import { Form, Formik, ErrorMessage } from 'formik';
import { useStateData } from 'hooks';
import qs from 'qs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  addPhoto,
  createPlayer,
  editPlayer,
  getPlayer,
  getPositions,
} from 'redux/slices/playersSlice';
import { RespStatusEnum } from 'types/enum';
import { IAddPLayerRequest } from 'types/players/addPLayerRequest';
import { IGetPlayerResponse } from 'types/players/getPlayerResponse';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z$\s*]+$/, 'Field can only contain Latin letters'),
  position: Yup.string().required('Required'),
  team: Yup.string().required('Required'),
  height: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers')
    .matches(/^[1-9][0-9]*$/, 'Year must not start with 0'),
  weight: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers')
    .matches(/^[1-9][0-9]*$/, 'Year must not start with 0'),
  birthday: Yup.string().required('Required'),
  number: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers')
    .matches(/^[1-9][0-9]*$/, 'Year must not start with 0'),
  avatarUrl: Yup.mixed().required('Required'),
});

export const PlayersCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [playersImage, setPlayersImage] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const teams = useAppSelector(({ teams }) => teams.data);

  const { id } = qs.parse(location.search.substring(1)) as { id: string };

  const playerData: IGetPlayerResponse = useStateData(getPlayer, id);
  const positions: string[] = useStateData(getPositions);

  const onSubmit = async (newPlayer: IAddPLayerRequest) => {
    setDisabledSubmit(true);
    const teamId = teams?.find((team) => team.name === String(newPlayer.team));

    if (teamId) {
      if (id) {
        const newPlayerValues = {
          ...newPlayer,
          id: Number(id),
          team: teamId.id,
        };
        void dispatch(editPlayer(newPlayerValues)).then(() => {
          onRedirectPlayerDetails();
        });
        setDisabledSubmit(false);
        return;
      }

      const newPlayerWithTeamId = { ...newPlayer, team: teamId.id };
      const resp = await dispatch(createPlayer(newPlayerWithTeamId)).catch((error) => {
        if (error && error.response.status === RespStatusEnum.EXISTS) {
          setServerResponse('Player with the specified name already exists');
        }
      });
      if (resp?.data) {
        onRedirectPlayers();
      }
      setDisabledSubmit(false);
    }
  };

  const onRedirectPlayers = () => {
    return navigate('/Players');
  };

  const onRedirectPlayerDetails = () => {
    navigate(`/PlayerDetails?id=${Number(id)}`);
  };

  const onNavigateBack = () => {
    if (id) {
      return onRedirectPlayerDetails();
    }
    onRedirectPlayers();
  };

  const positionOptions = positions?.map((p) => ({ value: p, label: p }));
  const initialSelectedPosition = positionOptions?.find((o) => o.value === playerData?.position);

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name }));
  const initialSelectedTeam = teamsOptions?.find((t) => t.value === playerData?.teamName);

  const date = playerData?.birthday?.replace('T00:00:00', '');

  const initialValues = {
    name: playerData?.name ?? '',
    position: initialSelectedPosition?.value ?? '',
    team: initialSelectedTeam?.value ?? '',
    height: playerData?.height ?? '',
    weight: playerData?.weight ?? '',
    birthday: date ?? '',
    number: playerData?.number ?? '',
    avatarUrl: playerData?.avatarUrl ?? '',
  } as unknown as IAddPLayerRequest;

  const getBackLink = 'Players';

  return (
    <div className="common__create">
      <InfoHeader getBackLink={getBackLink} name="Add new player" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize
      >
        {(formik) => {
          const onSavePlayerPhoto = (image: File | null) => {
            void dispatch(addPhoto(image)).then((imgString) => {
              if (imgString) {
                formik.setFieldValue('avatarUrl', imgString);
                setPlayersImage(imgString);
              }
            });
          };

          const onChangeOption = (option: string, name: string) => {
            formik.setFieldValue(name, option);
          };

          const onBlurOption = (name: string) => {
            formik.setFieldTouched(name, true);
          };

          const currentSelectedPosition = positionOptions?.find(
            (o) => o.value === formik.values.position
          );
          const currentSelectedTeam = teamsOptions.find(
            (t) => t.value === String(formik.values.team)
          );

          const onChangeDateHandler = (date: string, name: string) => {
            formik.setFieldValue(name, date);
          };

          const onBlurDateHandler = (name: string) => {
            formik.setFieldTouched(name, true);
          };

          return (
            <div className="common__create__content">
              <Form>
                <div className="common__create__image">
                  <InputFile<'avatarUrl'>
                    name="avatarUrl"
                    image={playersImage || playerData?.avatarUrl}
                    onSavePhoto={onSavePlayerPhoto}
                  />
                  <ErrorMessage className="form__error" name="avatarUrl" component="span" />
                </div>

                <div className="form">
                  <div className="form__group">
                    <InputText<'name'> label="Name" name="name" />
                    <ErrorMessage className="form__error" name="name" component="span" />
                  </div>

                  <div className="form__group">
                    <InputSelect<'position'>
                      label="Positions"
                      name="position"
                      isMulti={false}
                      onChange={onChangeOption}
                      onBlur={onBlurOption}
                      options={positionOptions}
                      value={currentSelectedPosition ?? initialSelectedPosition}
                    />
                    <ErrorMessage className="form__error" name="position" component="span" />
                  </div>

                  <div className="form__group">
                    <InputSelect<'team'>
                      label="Teams"
                      name="team"
                      isMulti={false}
                      onChange={onChangeOption}
                      onBlur={onBlurOption}
                      options={teamsOptions}
                      value={currentSelectedTeam ?? initialSelectedTeam}
                    />
                    <ErrorMessage className="form__error" name="team" component="span" />
                  </div>

                  <div className="common__create__groupParameters">
                    <div className="form__group">
                      <InputText<'height'> label="Height (cm)" name="height" />
                      <ErrorMessage className="form__error" name="height" component="span" />
                    </div>
                    <div className="form__group">
                      <InputText<'weight'> label="Weight (kg)" name="weight" />
                      <ErrorMessage className="form__error" name="weight" component="span" />
                    </div>
                  </div>

                  <div className="common__create__groupParameters">
                    <div className="form__group">
                      <InputDate<'birthday'>
                        label="Birthday"
                        name="birthday"
                        onChange={onChangeDateHandler}
                        onBlur={onBlurDateHandler}
                        value={formik.values.birthday ?? date}
                      />
                      <ErrorMessage className="form__error" name="birthday" component="span" />
                    </div>

                    <div className="form__group">
                      <InputText<'number'> label="Number" name="number" />
                      <ErrorMessage className="form__error" name="number" component="span" />
                    </div>
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
      {serverResponse && <RespError response={serverResponse} setResponse={setServerResponse} />}
    </div>
  );
};
