import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { location, locationId } from './location';

export interface bookingAttributes {
  id: number;
  id_location?: number;
  starting_date: Date;
  finish_date: Date;
  creation_date: Date;
  creation_user: string;
  updating_date?: Date;
  updating_user?: string;
  active_row: boolean;
}

export type bookingPk = "id";
export type bookingId = booking[bookingPk];
export type bookingOptionalAttributes = "id" | "id_location" | "creation_date" | "updating_date" | "updating_user" | "active_row";
export type bookingCreationAttributes = Optional<bookingAttributes, bookingOptionalAttributes>;

export class booking extends Model<bookingAttributes, bookingCreationAttributes> implements bookingAttributes {
  id!: number;
  id_location?: number;
  starting_date!: Date;
  finish_date!: Date;
  creation_date!: Date;
  creation_user!: string;
  updating_date?: Date;
  updating_user?: string;
  active_row!: boolean;

  // booking belongsTo location via id_location
  id_location_location!: location;
  getId_location_location!: Sequelize.BelongsToGetAssociationMixin<location>;
  setId_location_location!: Sequelize.BelongsToSetAssociationMixin<location, locationId>;
  createId_location_location!: Sequelize.BelongsToCreateAssociationMixin<location>;

  static initModel(sequelize: Sequelize.Sequelize): typeof booking {
    return booking.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_location: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'location',
        key: 'id'
      }
    },
    starting_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finish_date: {
      type: DataTypes.DATE,
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
    },
    active_row: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'booking',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "booking_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
