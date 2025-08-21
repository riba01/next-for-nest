import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyJwt } from '../verify-jwt-edge';
import { verifyLoginSession } from './verifyLoginSession';

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpString = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function verifyPassword(password: string, hash: string) {
  const isValid = await bcrypt.compare(password, hash);

  return isValid;
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJwt({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    sameSite: 'strict',
    expires: expiresAt,
    secure: true,
  });
}
export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

export async function getLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;
  if (!jwt || jwt === undefined) return;

  return verifyJwt(jwt);
}

export async function requireLoginSessionRedirect() {
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpString)
    .sign(jwtEncodedKey);
}

/* export async function verifyJwt(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    console.log('Invalid Token');
    return false;
  }
}
*/
