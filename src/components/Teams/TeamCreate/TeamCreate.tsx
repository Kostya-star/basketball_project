import s from './TeamCreate.module.scss';
import team_createIMG from '../../../assets/img/TeamCreate/team_createIMG.png';
import { InputText } from '../../FormComponents/InputText';
import { Form, Formik } from 'formik';
import { InputSubmit } from '../../FormComponents/InputSubmit';

interface INewTeamValues {
  team_name: string;
  team_division: string;
  team_conference: string;
  team_year: string;
}

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
            // validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <InputText label="Login" name="team_name" />
                  <InputText label="Division" name="team_division" />
                  <InputText label="Conference" name="team_conference" />
                  <InputText label="Year of foundation" name="team_year" />
                  <InputSubmit value='Save' name='button'/>
                </Form>
              );
            }}
          </Formik>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};
