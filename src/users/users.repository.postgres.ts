import { Pool, Result } from "pg";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository.interface";

export class PostgresUserRepository implements UserRepository {
  private client: Pool;

  constructor(client: Pool) {
    this.client = client;
  }
  private toUser(row: any): User {
    return { ...row, id: String(row.id) };
  }
  async findAll(): Promise<User[]> {
    const result = await this.client.query(
      "SELECT id, username, name, email, role FROM users",
    );
    return result.rows.map((row) => this.toUser(row));
  }

  async findUserById(id: string): Promise<User | null> {
    const result = await this.client.query(
      'SELECT * FROM "user" WHERE id = $1',
      [id],
    );
    if (result.rows.length > 0) {
      return this.toUser(result.rows[0]);
    }
    return null;
  }

  async createUser(user: Omit<User, "id" | "create_time">): Promise<User> {
    const query =
      "INSERT INTO users (username, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, name, email, role";
    const values = [
      user.username,
      user.name,
      user.email,
      user.password,
      user.role || "user",
    ];
    const result = await this.client.query(query, values);
    return this.toUser(result.rows[0]);
  }

  async updateUser(
    id: string,
    user: Partial<Omit<User, "id" | "create_time">>,
  ): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(user).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      return this.findUserById(id);
    }

    values.push(id);
    const query = `UPDATE "user" SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      return this.toUser(result.rows[0]);
    }
    return null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.client.query('DELETE FROM "user" WHERE id = $1', [
      id,
    ]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
