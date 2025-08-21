import { LoginRepository } from '../../repositories/login/login-repository';
import { DrizzleLoginRepository } from './drizzle-login-repository';
//import { JsonPostRepository } from './json-post-repository';

//export const postRepository: PostRepository = new JsonPostRepository();
export const loginRepository: LoginRepository = new DrizzleLoginRepository();
