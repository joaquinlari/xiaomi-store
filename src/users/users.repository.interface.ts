import { User } from "./users.entity";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  createUser(user: Omit<User, "id">): Promise<User>;
  updateUser(id: string, user: Partial<Omit<User, "id">>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
