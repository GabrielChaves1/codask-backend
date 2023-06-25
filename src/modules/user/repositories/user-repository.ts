import { User } from "@prisma/client";

export abstract class UserRepository {
  abstract create(username: string, email: string, password: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByUsername(username: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
}