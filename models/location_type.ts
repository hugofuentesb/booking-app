import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { location, locationId } from './location';

export interface location_typeAttributes {
  id: number;
  name: string;
  code_name?: string;
  description?: string;
  creation_date: Date;
  creation_user: string;
  updating_date?: Date;
  updating_user?: string;
}

export type location_typePk = "id";
export type location_typeId = location_type[location_typePk];
export type location_typeOptionalAttributes = "id" | "code_name" | "description" | "creation_date" | "updating_date" | "updating_user";
export type location_typeCreationAttributes = Optional<location_typeAttributes, location_typeOptionalAttributes>;

export class location_type extends Model<location_typeAttributes, location_typeCreationAttributes> implements location_typeAttributes {
  id!: number;
  name!: string;
  code_name?: string;
  description?: string;
  creation_date!: Date;
  creation_user!: string;
  updating_date?: Date;
  updating_user?: string;

  // location_type hasMany location via id_location_type
  locations!: location[];
  getLocations!: Sequelize.HasManyGetAssociationsMixin<location>;
  setLocations!: Sequelize.HasManySetAssociationsMixin<location, locationId>;
  addLocation!: Sequelize.HasManyAddAssociationMixin<location, locationId>;
  addLocations!: Sequelize.HasManyAddAssociationsMixin<location, locationId>;
  createLocation!: Sequelize.HasManyCreateAssociationMixin<location>;
  removeLocation!: Sequelize.HasManyRemoveAssociationMixin<location, locationId>;
  removeLocations!: Sequelize.HasManyRemoveAssociationsMixin<location, locationId>;
  hasLocation!: Sequelize.HasManyHasAssociationMixin<location, locationId>;
  hasLocations!: Sequelize.HasManyHasAssociationsMixin<location, locationId>;
  countLocations!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof location_type {
    return location_type.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    code_name: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Nemonic description for name"
    },
    description: {
      type: DataTypes.STRING(300),
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
    tableName: 'location_type',
    schema: 'booking',
    timestamps: false,
    indexes: [
      {
        name: "location_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
