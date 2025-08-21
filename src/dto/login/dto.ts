import { LoginModel } from '../../models/login/login-model';

export type LoginType = Omit<LoginModel, 'updatedAt'>;

export const makePartialLogin = (params?: Partial<LoginModel>): LoginType => {
  return {
    id: params?.id || '',
    username: params?.username || '',
    password_hash: params?.password_hash || '',
    createdAt: params?.createdAt || '',
  };
};

export const makeLoginDb = (params: LoginModel): LoginType => {
  return makePartialLogin(params);
};
