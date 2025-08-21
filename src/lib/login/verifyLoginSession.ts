import { loginRepository } from '../../models/login';
import { getLoginSession } from './manage-login';

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload || jwtPayload === undefined) return false;

  //Checa se o username é do usuario cadastrado
  const username = jwtPayload.username as string;
  const isUserNameValid = await loginRepository
    .findByUser(username)
    .catch(() => undefined);

  if (!isUserNameValid) return false;

  return isUserNameValid.username === jwtPayload.username;
}
