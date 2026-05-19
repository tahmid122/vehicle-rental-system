const createVehicle = async (payload: Record<string, unknown>) => {
  console.log(payload);
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  return 0;
};

export const vehiclesServices = { createVehicle };
