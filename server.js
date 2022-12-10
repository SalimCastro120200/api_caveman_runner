import cors from 'cors'
import db from "./app/config/db.js";
import express from "express";
import {fileURLToPath} from 'url'
import fs from 'fs';
import game from './app/routes/game.js';
import path from 'path';
import player from './app/routes/player.js';
import stats from './app/routes/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
const port = process.env.PORT || 1987;

app.use( express.json() );

app.use( express.urlencoded( { extended: true } ) );

app.get( "/", ( req, res ) => {
  res.json( { mensaje: "Bienvenid@ al API del Videojuego" } )
} )

app.use('/', player)
app.use('/', game)
app.use('/', stats)
app.get("/images/avatar/:avatar", function (req, res) {
  let { avatar } = req.params;
  try {
    // Condicion para revisar si existe la imagen del producto
    if (fs.existsSync(path.join(__dirname, "images", "players", avatar))) {
      // Si se encuentra la imagen, la envia a la página web
      return res.sendFile(path.join(__dirname, "images", "players", avatar));
    } else {
      // Sino se encuentra la imagen,  envia una imagen generica a la página web
      return res.sendFile(
        path.join(__dirname, "images", "players", "no-image.jpg")
      );
    }
  } catch (err) {
    throw err;
  }
});

app.listen( port, () => {
  console.log( `El servidor esta funcionando en el puerto: ${ port }` );
} )

try{
    await db.authenticate() 
    console.log( 'Conexión Correcta con la Base de Datos' )

    db.sync({})
    console.log('La Base de Datos está sincronizada')
} catch ( error ) {
    console.log( error )
}
