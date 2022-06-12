import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { booking, bookingId } from './booking';
import type { location_type, location_typeId } from './location_type';
import type { schedule, scheduleId } from './schedule';

export interface locationAttributes {
  id: number;
  id_location_type?: number;
  name: string;
  description: string;
  people_capacity: number;
  creation_date: Date;
  creation_user: string;
  updating_date?: Date;
  updating_user?: string;
}

export type locationPk = "id";
export type locationId = location[locationPk];
export type locationOptionalAttributes = "id" | "id_location_type" | "creation_date" | "updating_date" | "updating_user";
export type locationCreationAttributes = Optional<locationAttributes, locationOptionalAttributes>;

export class location extends Model<locationAttributes, locationCreationAttributes> implements locationAttributes {
  id!: number;
  id_location_type?: number;
  name!: string;
  description!: string;
  people_capacity!: number;
  creation_date!: Date;
  creation_user!: string;
  updating_date?: Date;
  updating_user?: string;

  // location hasMany booking via id_location
  bookings!: booking[];
  getBookings!: Sequelize.HasManyGetAssociationsMixin<booking>;
  setBookings!: Sequelize.HasManySetAssociationsMixin<booking, bookingId>;
  addBooking!: Sequelize.HasManyAddAssociationMixin<booking, bookingId>;
  addBookings!: Sequelize.HasManyAddAssociationsMixin<booking, bookingId>;
  createBooking!: Sequelize.HasManyCreateAssociationMixin<booking>;
  removeBooking!: Sequelize.HasManyRemoveAssociationMixin<booking, bookingId>;
  removeBookings!: Sequelize.HasManyRemoveAssociationsMixin<booking, bookingId>;
  hasBooking!: Sequelize.HasManyHasAssociationMixin<booking, bookingId>;
  hasBookings!: Sequelize.HasManyHasAssociationsMixin<booking, bookingId>;
  countBookings!: Sequelize.HasManyCountAssociationsMixin;
  // location hasMany schedule via id_location
  schedules!: schedule[];
  getSchedules!: Sequelize.HasManyGetAssociationsMixin<schedule>;
  setSchedules!: Sequelize.HasManySetAssociationsMixin<schedule, scheduleId>;
  addSchedule!: Sequelize.HasManyAddAssociationMixin<schedule, scheduleId>;
  addSchedules!: Sequelize.HasManyAddAssociationsMixin<schedule, scheduleId>;
  createSchedule!: Sequelize.HasManyCreateAssociationMixin<schedule>;
  removeSchedule!: Sequelize.HasManyRemoveAssociationMixin<schedule, scheduleId>;
  removeSchedules!: Sequelize.HasManyRemoveAssociationsMixin<schedule, scheduleId>;
  hasSchedule!: Sequelize.HasManyHasAssociationMixin<schedule, scheduleId>;
  hasSchedules!: Sequelize.HasManyHasAssociationsMixin<schedule, scheduleId>;
  countSchedules!: Sequelize.HasManyCountAssociationsMixin;
  // location belongsTo location_type via id_location_type
  id_location_type_location_type!: location_type;
  getId_location_type_location_type!: Sequelize.BelongsToGetAssociationMixin<location_type>;
  setId_location_type_location_type!: Sequelize.BelongsToSetAssociationMixin<location_type, location_typeId>;
  createId_location_type_location_type!: Sequelize.BelongsToCreateAssociationMixin<location_type>;

  static initModel(sequelize: Sequelize.Sequelize): typeof location {
    return location.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_location_type: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'location_type',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    people_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    creation_user: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    updating_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updating_user: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'location',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "location_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
