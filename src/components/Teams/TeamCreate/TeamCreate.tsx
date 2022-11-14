import s from './TeamCreate.module.scss';
import team_createIMG from '../../../assets/img/TeamCreate/team_createIMG.png';
import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';  
import { InputSubmit } from '../../FormComponents/InputSubmit';
import * as Yup from 'yup';

interface INewTeamValues {
  team_name: string;
  team_division: string;
  team_conference: string;
  team_year: string;
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
  return (
    <div className={s.team__create}>
      <div className={s.team__create__header}>
        <p>
          <span>Teams</span>
          &nbsp; / &nbsp;
          <span>Add new team</span>
        </p>
      </div>

      <div className={s.team__create__content}>
        <div>
          <img src={team_createIMG} alt="" />
        </div>
        <div>
          <Formik
            initialValues={
              {
                team_name: '',
                team_division: '',
                team_conference: '',
                team_year: '',
              } as INewTeamValues
            }
            validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <InputText label="Name" name="team_name" />
                  <InputText label="Division" name="team_division" />
                  <InputText label="Conference" name="team_conference" />
                  <InputText label="Year of foundation" name="team_year" />
                  <div className={s.team__create__buttons}>
                    <button>Cancel</button>
                    <InputSubmit isDisabled={!formik.isValid} value="Save" name="button" />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
