import { Sequelize } from "sequelize"
import 'dotenv/config'

export class DBConnection {

  private database:  string;
  private username:  string;
  private password?: string;
  private host?:     string;
  //private dialect:   string;

  constructor() {
    this.database = process.env.DATABASE  || '';
    this.username = process.env.DBUSERNAME  || '';
    this.password = process.env.PASSWORD;
    this.host     = process.env.HOST;
    //this.dialect  = process.env.DIALECT;
  }

  getConnection() {
    console.log("DATABASE: ", this.database);
    console.log("USERNAME: ", this.username);
    console.log("PASSWORD: ", this.password);
    return new Sequelize( this.database, this.username, this.password, { host: this.host,
                                                                                    dialect: 'postgres'
                                                                                    //logging: false,
                                                                                  } );
  }

}

// const databaseConfig = {
//     // username: 'postgres',
//     // password: 'postgres',
//     // database: 'booking_db', 
//     // host: 'localhost',
//     // dialect: 'postgres',
    
//     // database: `${process.env.DATABASE}`,
//     // username: `${process.env.USERNAME}`,
//     // password: `${process.env.PASSWORD}`,
//     // host:     `${process.env.HOST}`,
//     // dialect:  `${process.env.DIALECT}`,
//     //logging: false,

//     database: process.env.DATABASE || '',
//     username: process.env.USERNAME || '',
//     password: process.env.PASSWORD || '',
//     host:     process.env.HOST || '',
//     dialect:  process.env.DIALECT || '',
//     //logging: false,
// }


// export const DBConnection = new Sequelize(
//   databaseConfig.database, 
//     databaseConfig.username, 
//     databaseConfig.password,
//      { host: databaseConfig.host,
//        dialect: 'postgres'
//        //logging: false,
//      });
