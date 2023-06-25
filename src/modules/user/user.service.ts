import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user-repository";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async create(username: string, email: string, password: string): Promise<User> {
    return await this.userRepository.create(username, email, password);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
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