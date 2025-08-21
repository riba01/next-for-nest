// lib/verify-jwt-edge.ts
import { jwtVerify } from 'jose';

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey!);

export async function verifyJwt(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return false;
  }
}
