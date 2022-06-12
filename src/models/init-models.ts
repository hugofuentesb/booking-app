import type { Sequelize } from "sequelize";
import { booking as _booking } from "./booking";
import type { bookingAttributes, bookingCreationAttributes } from "./booking";
import { day_of_week as _day_of_week } from "./day_of_week";
import type { day_of_weekAttributes, day_of_weekCreationAttributes } from "./day_of_week";
import { location as _location } from "./location";
import type { locationAttributes, locationCreationAttributes } from "./location";
import { location_type as _location_type } from "./location_type";
import type { location_typeAttributes, location_typeCreationAttributes } from "./location_type";
import { schedule as _schedule } from "./schedule";
import type { scheduleAttributes, scheduleCreationAttributes } from "./schedule";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _booking as booking,
  _day_of_week as day_of_week,
  _location as location,
  _location_type as location_type,
  _schedule as schedule,
  _user as user,
};

export type {
  bookingAttributes,
  bookingCreationAttributes,
  day_of_weekAttributes,
  day_of_weekCreationAttributes,
  locationAttributes,
  locationCreationAttributes,
  location_typeAttributes,
  location_typeCreationAttributes,
  scheduleAttributes,
  scheduleCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const booking = _booking.initModel(sequelize);
  const day_of_week = _day_of_week.initModel(sequelize);
  const location = _location.initModel(sequelize);
  const location_type = _location_type.initModel(sequelize);
  const schedule = _schedule.initModel(sequelize);
  const user = _user.initModel(sequelize);

  schedule.belongsTo(day_of_week, { as: "id_day_of_week_day_of_week", foreignKey: "id_day_of_week"});
  day_of_week.hasMany(schedule, { as: "schedules", foreignKey: "id_day_of_week"});
  booking.belongsTo(location, { as: "id_location_location", foreignKey: "id_location"});
  location.hasMany(booking, { as: "bookings", foreignKey: "id_location"});
  schedule.belongsTo(location, { as: "id_location_location", foreignKey: "id_location"});
  location.hasMany(schedule, { as: "schedules", foreignKey: "id_location"});
  location.belongsTo(location_type, { as: "id_location_type_location_type", foreignKey: "id_location_type"});
  location_type.hasMany(location, { as: "locations", foreignKey: "id_location_type"});

  return {
    booking: booking,
    day_of_week: day_of_week,
    location: location,
    location_type: location_type,
    schedule: schedule,
    user: user,
  };
}
