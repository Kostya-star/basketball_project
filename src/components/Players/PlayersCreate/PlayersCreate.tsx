import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { InputFile } from "../../FormComponents/InputFile";
import { SelectComponent } from "../../FormComponents/SelectComponent";
import { InputSubmit } from "../../FormComponents/InputSubmit";
import { InputText } from "../../FormComponents/InputText";
import { InfoHeader } from "../../InfoHeader/InfoHeader";



export const PlayersCreate = () => {
  const[playersImage, setPlayersImage] = useState<File | null>(null)

  const onSavePlayerPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setPlayersImage(e.target.files[0])
    }
  };

  const initialValues = {
    name: ''
  }

  const onSubmit = () => {
    alert('values')
  }


  return (
    <div className='common__create'>
      <InfoHeader text='Players / Add new player' />

      <Formik
        initialValues={initialValues}
        // validationSchema={}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form>
              <div className='common__create__content'>
                <div className='common__create__image'>
                  <InputFile<'avatarUrl'> name='avatarUrl' image={playersImage} formik={formik} onSavePhoto={onSavePlayerPhoto}/>
                </div>

                <div>
                  <InputText<'name'> label="Name" name="name" />
                  <SelectComponent<'position'> label='Positions'  name='position'/>
                  <SelectComponent<'team'> label='Team'  name='team'/>
                  <InputText<'conference'> label="Conference" name="conference" />
                  <InputText<'foundationYear'> label="Year of foundation" name="foundationYear" />
                  <div className='common__create__buttons'>
                    <button >Cancel</button>
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
}
