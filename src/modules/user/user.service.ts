import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user-repository";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async create(email: string, password: string): Promise<User> {
    return await this.userRepository.create(email, password);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
  
  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
  
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}