//import dotenv from 'dotenv';
import { Server } from './src/servers/server';


//dotenv.config();

//const server = new ServerHttp();
//server.listenWithWebSockets();

const server = new Server();
server.listen();
