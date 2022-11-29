import { ISignUpFormikValues } from './auth';

export type ISignUpRequest = Omit<ISignUpFormikValues, 'confirmPassword' | 'check'>;
