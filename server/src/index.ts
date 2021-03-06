import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import { umzug } from './db/migrator'
import * as middlewares from './middlewares';

// Apply all pending database migrations
umzug.up();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors());
app.use(helmet());

app.use(middlewares.tokenChecker);
app.use(router);

const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
