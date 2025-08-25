import { LoginModel } from '../../models/login/login-model';

export type LoginType = Omit<LoginModel, 'updatedAt'>;

export const makePartialLogin = (params?: Partial<LoginModel>): LoginType => {
  return {
    id: params?.id || 0,
    username: params?.username || '',
    passwordHash: params?.passwordHash || '',
    createdAt: params?.createdAt || '',
  };
};

export const makeLoginDb = (params: LoginModel): LoginType => {
  return makePartialLogin(params);
};
