import { pool } from "../../config/db";

const getAllUsers = async () => {
  return await pool.query(`
         SELECT * FROM users
        `);
};

const updateUser = async (payload: Record<string, unknown>, id: string) => {
  console.log("Id from service ", id);
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(payload)) {
    fields.push(`${key}=$${index}`);
    values.push(value);
    index++;
  }
  values.push(id);

  return await pool.query(
    `
      UPDATE users SET ${fields.join(",")} WHERE id=$${index} RETURNING *
    `,
    [...values],
  );
};

export const usersServices = { getAllUsers, updateUser };
