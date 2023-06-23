import { User } from "../entities/user";

export abstract class UserRepository {
  abstract create(email: string, password: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
}