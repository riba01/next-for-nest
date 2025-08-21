import { LoginModel } from '../../models/login/login-model';

export interface LoginRepository {
  findAll(): Promise<LoginModel[]>;
  findById(id: number): Promise<LoginModel>;
  findByUser(username: string): Promise<LoginModel>;

  // Mutation
  create(login: LoginModel): Promise<LoginModel>;
  delete(id: number): Promise<LoginModel>;
  update(
    id: number,
    newPostData: Omit<
      LoginModel,
      'id' | 'username' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<LoginModel>;
}
