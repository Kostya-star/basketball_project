import { Field, Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { InputFile } from '../../FormComponents/InputFile';
import { SelectComponent } from '../../FormComponents/SelectComponent';
import { InputSubmit } from '../../FormComponents/InputSubmit';
import { InputText } from '../../FormComponents/InputText';
import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { InputDate } from '../../FormComponents/InputDate';
import * as Yup from 'yup';
import { IAddPLayerRequest, IPlayerState } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './../../../redux/hooks';
import { getPositions, createPlayer } from '../../../redux/slices/playersSlice';
import { log } from 'console';


const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .matches(/^[a-zA-Z$\s*]+$/, 'Field can only contain Latin letters'),
  position: Yup.string().required('Required'),
  team: Yup.string().required('Required'),
  height: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers'),
  weight: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers'),
  birthday: Yup.string().required('Required'),
  number: Yup.string()
    .required('Required')
    .matches(/^[0-9]+$/, 'Field can only contain numbers'),
    avatarUrl: Yup.mixed().required('Required'),
  });
  
  
  
  export const PlayersCreate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    
    const [playersImage, setPlayersImage] = useState<File | null>(null);
    
    const positions = useAppSelector(({players}) => players.positions) 
    const teams = useAppSelector(({teams}) => teams.data) 
    
    const positionOptions = positions?.map((p) => ({value: p, label: p}))
    const teamsOptions = teams?.map((t) => ({value: t.name, label: t.name}))
    
    const initialValues = {
      name: '',
      position: '',
      team: undefined,
      height: undefined,
      weight: undefined,
      birthday: '',
      number: undefined,
      avatarUrl: '',
    } as unknown as IAddPLayerRequest;

  useEffect(() => {
    void dispatch(getPositions())
  }, [])



  const onSubmit = async(newPlayer: IAddPLayerRequest) => {
    const teamId = teams?.find(team => team.name === String(newPlayer.team))
    if(teamId) {
      const newPlayerWithTeamId = {...newPlayer, team: teamId.id}
      const resp = await dispatch(createPlayer(newPlayerWithTeamId, playersImage))
      if(resp?.data) {
        return onCancelButton()
      }
    }
  };

  const onCancelButton = () => {
    return navigate('/Players');
  };


  return (
    <div className="common__create">
      <InfoHeader text="Players / Add new player" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          // console.log(formik);
          const onSavePlayerPhoto = (image: File | null) => {
            formik.setFieldValue('avatarUrl', image);
            setPlayersImage(image);
          };

          const onChangeOption = (option: string, name: string) => {
            formik.setFieldValue(name, option);
          };

          const onBlurOption = (name: string) => {
            formik.setFieldTouched(name, true);
          };

          return (
            <Form>
              <div className="common__create__content">
                <div className="common__create__image">
                  <InputFile<'avatarUrl'>
                    name="avatarUrl"
                    image={playersImage}
                    onSavePhoto={onSavePlayerPhoto}
                  />
                </div>

                <div>
                  <InputText<'name'> label="Name" name="name" />
                  <SelectComponent<'position'>
                    label="Positions"
                    name="position"
                    onChange={onChangeOption}
                    onBlur={onBlurOption}
                    options={positionOptions}
                  />
                  <SelectComponent<'team'>
                    label="Teams"
                    name="team"
                    onChange={onChangeOption}
                    onBlur={onBlurOption}
                    options={teamsOptions}
                  />
                  <div className="common__create__groupParameters">
                    <InputText<'height'> label="Height (cm)" name="height" />
                    <InputText<'weight'> label="Weight (kg)" name="weight" />
                  </div>
                  <div className="common__create__groupParameters">
                    <InputDate<'birthday'> label="Birthday" name="birthday" />
                    <InputText<'number'> label="Number" name="number" />
                  </div>
                  <div className="common__create__buttons">
                    <button onClick={onCancelButton}>Cancel</button>
                    <InputSubmit value="Save" />
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
