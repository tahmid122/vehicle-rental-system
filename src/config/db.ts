import { Pool } from "pg";
import { config } from ".";
export const pool = new Pool({ connectionString: config.db_url });

const initDB = async () => {
  // users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password TEXT NOT NULL CHECK (LENGTH(password)>=6),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin','customer'))
    )
    `);
  // vehicles table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(100) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available','booked'))
    )
    `);
  // bookings table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE ON UPDATE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC(10,2) NOT NULL CHECK(total_price>0),
        status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'cancelled' , 'returned'))
    )
    `);
};

export default initDB;
