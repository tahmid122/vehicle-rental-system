import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const signUp = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hashPassword = await bcrypt.hash(password as string, 10);
  console.log(hashPassword);
  return await pool.query(
    `
        INSERT INTO users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    [name, email, hashPassword, phone, role],
  );
};

export const authServices = { signUp };
