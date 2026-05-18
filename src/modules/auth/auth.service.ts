import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";
const signUp = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hashPassword = await bcrypt.hash(password as string, 10);
  const modifiedEmail = (email as string).toLowerCase();
  return await pool.query(
    `
        INSERT INTO users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role
    `,
    [name, modifiedEmail, hashPassword, phone, role],
  );
};

const signIn = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;
  const result = await pool.query(
    `
       SELECT * FROM users WHERE email=$1     
    `,
    [email],
  );
  const user = result.rows[0] || null;
  if (!user) return null;
  const isMatch = await bcrypt.compare(password as string, user.password);

  if (!isMatch) return false;
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
    config.jwt_secret as string,
  );
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

export const authServices = { signUp, signIn };
