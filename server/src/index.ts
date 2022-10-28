import  express from  "express";
import fs from 'fs';
import path from 'path';
import cors from 'cors';
const app = express();
const port = 9000; // default port to listen

app.use(express.urlencoded({
    extended: true,
}));

const allowedOrigins = ['http://localhost:8080','http://localhost:8000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors());

const dataDir = process.env.DEVELOPMENT ? `${__dirname}/../../data` : '/data';
// tslint:disable-next-line:no-console
console.log(`DATA DIRECTORY IS: ${dataDir}`);
app.use('/data', express.static(dataDir));

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

// define a route handler for the default home page
app.get( "/api/videoFiles", ( req, res ) => {
    const files = fs.readdirSync(dataDir, {
        withFileTypes: true
    });
    const filtered = files.filter((item) => item.isFile() && item.name.endsWith('.mp4')).map((item) => item.name);
    res.json(filtered);
});

app.get( "/api/jsonFiles", ( req, res ) => {
    const files = fs.readdirSync(dataDir, {
        withFileTypes: true
    });
    const filtered = files.filter((item) => item.isFile() && item.name.endsWith('.json')).map((item) => item.name);
    res.json(filtered);
});
