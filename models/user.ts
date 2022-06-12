import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface userAttributes {
  id: number;
  username: string;
  password: string;
  email?: string;
  creation_date: Date;
  creation_user: string;
  updating_date?: Date;
  updating_user?: string;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "email" | "creation_date" | "updating_date" | "updating_user";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  username!: string;
  password!: string;
  email?: string;
  creation_date!: Date;
  creation_user!: string;
  updating_date?: Date;
  updating_user?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "unq_username"
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
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
    tableName: 'user',
    schema: 'security',
    timestamps: false,
    indexes: [
      {
        name: "unq_username",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "user_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
