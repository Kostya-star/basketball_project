import { ErrorMessage, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { InputFile } from '../../FormComponents/InputFile';
import { SelectComponent } from '../../FormComponents/SelectComponent';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import { InputText } from '../../FormComponents/InputText';
import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { InputDate } from '../../FormComponents/InputDate';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './../../../redux/hooks';
import {
  getPositions,
  createPlayer,
  getPlayer,
  addPhoto,
  editPlayer,
} from '../../../redux/slices/playersSlice';
import { IAddPLayerRequest } from '../../../types/players/addPLayerRequest';
import { RespStatusEnum } from '../../../types/enum';
import { RespError } from '../../RespError';
import { ISelectOption } from '../../../types/ISelectOption';
import qs from 'qs';
import { IGetPlayerResponse } from '../../../types/players/getPlayerResponse';


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

export const PlayersCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [playersImage, setPlayersImage] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [serverResponse, setServerResponse] = useState('');
  const [playerData, setPlayerData] = useState({} as IGetPlayerResponse);
  const [positions, setPositions] = useState<string[]>([]);

  const teams = useAppSelector(({ teams }) => teams.data);

  const { id } = qs.parse(location.search.substring(1));

  useEffect(() => {
    void dispatch(getPositions()).then((positionsArray) => {
      if (positionsArray) {
        setPositions(positionsArray);
      }
    });
    if (id) {
      void dispatch(getPlayer(Number(id))).then((resp) => {
        if (resp) {
          setPlayerData(resp.data);
        }
      });
    }
  }, []);

  const positionOptions = positions?.map((p) => ({ value: p, label: p }));
  const initialPosition = positionOptions?.find((o) => o.value === playerData?.position);

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name }));
  const initialSelectedTeam = teamsOptions?.find((t) => t.value === playerData.teamName);

  const date = playerData.birthday?.replace('T00:00:00', '');

  const initialValues = {
    name: playerData?.name ?? '',
    position: initialPosition?.value ?? '',
    team: initialSelectedTeam?.value ?? '',
    height: playerData?.height ?? '',
    weight: playerData?.weight ?? '',
    birthday: date ?? '',
    number: playerData?.number ?? '',
    avatarUrl: playerData?.avatarUrl ?? '',
  } as unknown as IAddPLayerRequest;

  const onSubmit = async (newPlayer: IAddPLayerRequest) => {
    setDisabledSubmit(true);
    const teamId = teams?.find((team) => team.name === String(newPlayer.team));
    
    if(id) {
      if(teamId) {
        const newPlayerValues = {
          ...newPlayer,
          id: Number(id),
          team: teamId.id
        };
        void dispatch(editPlayer(newPlayerValues)).then((resp) => {
          console.log(resp);
          
          onRedirectPlayerDetails()
        })
        setDisabledSubmit(false);
        return;
      }
    }

    if (teamId) {
      const newPlayerWithTeamId = { ...newPlayer, team: teamId.id };
      const resp = await dispatch(createPlayer(newPlayerWithTeamId)).catch((error) => {
        if (error && error.response.status === RespStatusEnum.EXISTS) {
          setServerResponse('User with the specified login already exists');
        }
      });
      if (resp?.data) {
        onRedirectPlayers();
      }
    }
    setDisabledSubmit(false);
  };


  const onRedirectPlayers = () => {
    return navigate('/Players');
  };

  const onRedirectPlayerDetails = () => {
    navigate(`/PlayerDetails?id=${Number(id)}`)
  }

  const onCancel = () => {
    if(id) {
      return onRedirectPlayerDetails()
    }
    onRedirectPlayers()
  }

  return (
    <div className="common__create">
      {/* <InfoHeader name="Players / Add new player" /> */}

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
          }

          return (
            <Form>
              <div className="common__create__content">
                <div className="common__create__image">
                  <InputFile<'avatarUrl'>
                    name="avatarUrl"
                    image={playersImage || playerData.avatarUrl}
                    onSavePhoto={onSavePlayerPhoto}
                  />
                </div>

                <div>
                  <InputText<'name'> label="Name" name="name" />
                  <SelectComponent<'position'>
                    label="Positions"
                    name="position"
                    isMulti={false}
                    onChange={onChangeOption}
                    onBlur={onBlurOption}
                    options={positionOptions}
                    value={currentSelectedPosition ?? initialPosition}
                  />
                  <SelectComponent<'team'>
                    label="Teams"
                    name="team"
                    isMulti={false}
                    onChange={onChangeOption}
                    onBlur={onBlurOption}
                    options={teamsOptions}
                    value={currentSelectedTeam ?? initialSelectedTeam}
                  />
                  <div className="common__create__groupParameters">
                    <InputText<'height'> label="Height (cm)" name="height" />
                    <InputText<'weight'> label="Weight (kg)" name="weight" />
                  </div>
                  <div className="common__create__groupParameters">
                    <InputDate<'birthday'>
                      label="Birthday"
                      name="birthday"
                      onChange={onChangeDateHandler}
                      onBlur={onBlurDateHandler}
                      value={formik.values.birthday ?? date}
                    />
                    <InputText<'number'> label="Number" name="number" />
                  </div>
                  <div className="common__create__buttons">
                    <button onClick={onCancel}>Cancel</button>
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
