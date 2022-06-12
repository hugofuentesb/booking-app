import express from 'express';

// Import Routes
import testingRoutes from '../routes/test.route';
import locationRoutes from '../routes/location.route';
import locationTypesRoutes from '../routes/locationType.route';
import bookingRoutes from '../routes/booking.route';

import { DBConnection } from '../database/connection';
import { initModels } from '../models/init-models';
import  cors  from 'cors';
import { Cors } from '../helpers/cors';

//require("dotenv").config();
import 'dotenv/config'


export class Server {

    private app: express.Application;
    private port?: string = '';

    private apiPaths = {
        testing:        '/api/testing',
        locations:      '/api/location',
        locationTypes:  '/api/locationTypes',
        bookings:       '/api/booking',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.database();
        this.middlewares();
        this.routes();
        
    }


    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        //this.app.use(cors( new Cors().getCorsOptions() ));
    }

    database() {
        let dbConnection = new DBConnection().getConnection();

        //DBConnection.authenticate().then( () => {
        dbConnection.authenticate().then( () => {
            console.log("Database Connected.");
        }).catch( error => {
            console.log("Error connecting to Database.")
            console.error(error);
        });

        // Initialize models of DB
        initModels(dbConnection);
    }

    routes() {
        this.app.use( this.apiPaths.testing, testingRoutes );
        this.app.use( this.apiPaths.locations, locationRoutes );
        this.app.use( this.apiPaths.bookings, bookingRoutes );
        this.app.use( this.apiPaths.locationTypes, locationTypesRoutes );
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor levantado en puerto: ${this.port}`);
        });
    }
}