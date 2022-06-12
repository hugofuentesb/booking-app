import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { schedule, scheduleId } from './schedule';

export interface day_of_weekAttributes {
  id: number;
  name: string;
  code_name: string;
  day_number?: number;
  creation_date: Date;
  creation_user: string;
  updating_date?: Date;
  updating_user?: string;
}

export type day_of_weekPk = "id";
export type day_of_weekId = day_of_week[day_of_weekPk];
export type day_of_weekOptionalAttributes = "id" | "day_number" | "creation_date" | "updating_date" | "updating_user";
export type day_of_weekCreationAttributes = Optional<day_of_weekAttributes, day_of_weekOptionalAttributes>;

export class day_of_week extends Model<day_of_weekAttributes, day_of_weekCreationAttributes> implements day_of_weekAttributes {
  id!: number;
  name!: string;
  code_name!: string;
  day_number?: number;
  creation_date!: Date;
  creation_user!: string;
  updating_date?: Date;
  updating_user?: string;

  // day_of_week hasMany schedule via id_day_of_week
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

  static initModel(sequelize: Sequelize.Sequelize): typeof day_of_week {
    return day_of_week.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    code_name: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    day_number: {
      type: DataTypes.SMALLINT,
      allowNull: true
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
    tableName: 'day_of_week',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "day_of_week_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
