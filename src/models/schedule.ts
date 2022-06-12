import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { day_of_week, day_of_weekId } from './day_of_week';
import type { location, locationId } from './location';

export interface scheduleAttributes {
  id: number;
  id_location?: number;
  id_day_of_week?: number;
  day: string;
  starting_time: string;
  finish_time: string;
  creation_date: Date;
  creation_user: string;
  updating_date?: Date;
  updating_user?: string;
  active_row: boolean;
}

export type schedulePk = "id";
export type scheduleId = schedule[schedulePk];
export type scheduleOptionalAttributes = "id_location" | "id_day_of_week" | "creation_date" | "updating_date" | "updating_user" | "active_row";
export type scheduleCreationAttributes = Optional<scheduleAttributes, scheduleOptionalAttributes>;

export class schedule extends Model<scheduleAttributes, scheduleCreationAttributes> implements scheduleAttributes {
  id!: number;
  id_location?: number;
  id_day_of_week?: number;
  day!: string;
  starting_time!: string;
  finish_time!: string;
  creation_date!: Date;
  creation_user!: string;
  updating_date?: Date;
  updating_user?: string;
  active_row!: boolean;

  // schedule belongsTo day_of_week via id_day_of_week
  id_day_of_week_day_of_week!: day_of_week;
  getId_day_of_week_day_of_week!: Sequelize.BelongsToGetAssociationMixin<day_of_week>;
  setId_day_of_week_day_of_week!: Sequelize.BelongsToSetAssociationMixin<day_of_week, day_of_weekId>;
  createId_day_of_week_day_of_week!: Sequelize.BelongsToCreateAssociationMixin<day_of_week>;
  // schedule belongsTo location via id_location
  id_location_location!: location;
  getId_location_location!: Sequelize.BelongsToGetAssociationMixin<location>;
  setId_location_location!: Sequelize.BelongsToSetAssociationMixin<location, locationId>;
  createId_location_location!: Sequelize.BelongsToCreateAssociationMixin<location>;

  static initModel(sequelize: Sequelize.Sequelize): typeof schedule {
    return schedule.init({
    id: {
      type: DataTypes.SMALLINT,
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
    id_day_of_week: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'day_of_week',
        key: 'id'
      }
    },
    day: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    starting_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    finish_time: {
      type: DataTypes.TIME,
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
    tableName: 'schedule',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "schedule_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
