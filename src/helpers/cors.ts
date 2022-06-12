import  cors  from 'cors';


export class Cors {

    //allowedOrigins = ['http://localhost:4200'];
    allowedOrigins = ['http://localhost:4200'];

    constructor() {
        
    }


    // getCorsOptions() {
    //     const whitelist = ["http://localhost:4200"];
    //     const corsOptions = {
    //         origin: function (origin: any, callback: any) {
    //             console.log(origin)
    //             if (whitelist.indexOf(origin) !== -1) {
    //                 callback(null, true)
    //             } else {
    //                 callback(new Error('Not allowed by CORS'))
    //             }
    //         },
    //         credentials: true,
    //         enablePreflight: true
    //     }
    //     return corsOptions;
    // }

    getCorsOptions() {
        const options: cors.CorsOptions = {
            origin: this.allowedOrigins,
            optionsSuccessStatus: 200,
            methods: 'GET, PUT, POST, DELETE'
          };
        return options;
    }
}