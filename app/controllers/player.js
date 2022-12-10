import Player from "../models/Player.js";
import bcrypt from 'bcrypt';

const findPlayerByID = async ( req, res ) => {
  const { id } = req.params;
  const player = await Player.findOne( { where: { id } } );

  if ( !player ) {
    return res.status( 404 ).json({
      mensaje: `No existe el jugador con el ID: ${id}.`
    });
  }

  res.json( player )
}

const findAllPlayers = async ( req, res ) => {
  const allPlayers = await Player.findAll();
  res.json( allPlayers );
  return false;
};

const createPlayer = async (req, res) => {
  // const { correo, password, nombres, paterno, materno, fecha_nacimiento, gamertag, avatar } = req.body;data.
  console.log(req.body);

  // var data = req.body.data.data;

  try {
    const existsPlayerByEmail = await Player.findOne({
      where: { correo: req.body.data.correo }
    });

    const existsPlayerByNickname = await Player.findOne({
      // where: { gamertag :req.body.data.data.gamertag }
      where: { gamertag: req.body.data.gamertag }
    });

    if ( existsPlayerByEmail ) {
      return res.json({ mensaje: `El Jugador ya existe con correo ${ req.body.data.correo } ya existe.` });
    } else if( existsPlayerByNickname ){
      return res.json({ mensaje: `El Jugador ya existe con el GamerTag ${ req.body.data.gamertag } ya existe.` });
    }else {
      const newPlayer = await Player.create({
        correo: req.body.data.correo,
        password: req.body.data.password,
        nombres: req.body.data.nombres,
        paterno: req.body.data.paterno,
        materno: req.body.data.materno,
        fecha_nacimiento: req.body.data.fecha_nacimiento,
        gamertag: req.body.data.gamertag,
        avatar: req.body.data.avatar
      });

      return res.json({
        mensaje: `El Jugador ${ newPlayer.gamertag } ha sido creado`,
      });
    }
  } catch ( error ) {
    console.log( error );
    return res.json({
      mensaje: `Un error ocurrio al crear al Jugador`,
    });
  }
};

const updatePlayer = async ( req, res ) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const player = await Player.findOne({
      where: {id}
    });

    if ( !player ) {
      return res.status( 404 ).json({
        mensaje: `No existe el jugador con el ID: ${id}.`
      });
    }

    await player.update( body );
    res.json( player );

  } catch (err) {
    res.json( err );
  }

}

const deletePlayerByID = async ( req, res ) => {
  const { id } = req.params;
  const player = await Player.findOne({
    where: { id }
  });

  if ( !player ) {
    return res.status( 404 ).json({
      mensaje: `No existe el jugador con el ID: ${id}.`
    });
  }

  await player.destroy();
  res.json( { mensaje: `El Jugador con el ID ${id} ha sido eliminado.` } )

};

const findPlayerByNickname = async ( req, res ) => {
  const { gamertag } = req.params;
  const player = await Player.findOne({ 
    where: { gamertag } 
  });

  if ( !player ) {
    return res.status( 404 ).json({
      mensaje: `No existe el jugador con el GamerTag: ${gamertag}.`
    });
  } 

  res.json( player )
};

const login = async(req, res) => {
  const { correo, password} = req.body;
  console.log(req.body);
  const player =  await Player.findOne({where: {correo:correo}});
  console.log(player);
  if (player) {
       const pass_valid = await bcrypt.compare(password, player.password);
      if (pass_valid) {return res.status(200).json({mensaje: 'Acceso ✔'});
      }else{
          res.status(400).json({ error : "Password Incorrect" });}
  }else{
      res.status(404).json({ error : "User does not exist" });
    }
}

export {
  findPlayerByID,
  findAllPlayers,
  createPlayer,
  updatePlayer,
  deletePlayerByID,
  findPlayerByNickname,
  login
};
