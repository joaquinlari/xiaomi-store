import { User } from "./users.entity";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  createUser(user: Omit<User, "id" | "create_time">): Promise<User>;
  updateUser(
    id: string,
    user: Partial<Omit<User, "id" | "create_time">>,
  ): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
