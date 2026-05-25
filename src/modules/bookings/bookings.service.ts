import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const result = await pool.query(
    `
            SELECT * FROM vehicles WHERE id=$1
        `,
    [vehicle_id],
  );
  const date1 = new Date(rent_start_date as Date);
  const date2 = new Date(rent_end_date as Date);

  const diffInMs = Math.abs(date2.getTime() - date1.getTime());

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const mainPrice = result.rows[0].daily_rent_price;
  const totalPrice = mainPrice * diffInDays;
  const status = "active";
  return await pool.query(
    `
        INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      status,
    ],
  );
};

export const bookingsServices = { createBooking };
